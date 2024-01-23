const express = require("express");
const app = express();
const fs = require('fs').promises;

var bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


const storeDataHandler = async (data)=>{
    await fs.writeFile('data.json',JSON.stringify(data),(err)=>{
        if(err) throw err;
    });
}

// /studentSearch will fetch all data from FrontEnd
app.post('/studentSearch', async (req,res)=>{
    const data = req.body;
    if(data.data === undefined){
        const studentDetails = Array.from(data.data.documents);
        //Extract Y23 data
        const requiredData = studentDetails.filter((data)=>{
            const year = data.i.slice(0,2);
            return year === '23';
        });

        //Format data in format wing - room - data
        const studentDetailsFormat = {};
        requiredData.forEach((studentDetail) => {
            const hall = studentDetail.h;
            const wing = studentDetail.r.split('-')[0];
            const roomNumber = studentDetail.r.split('-')[1];
            if (!studentDetailsFormat[hall]) {
                studentDetailsFormat[hall] = {};
            }

            if (!studentDetailsFormat[hall][wing]) {
                studentDetailsFormat[hall][wing] = {};
            }
            // Ensure the roomNumber exists and is an array
            if (!studentDetailsFormat[hall][wing][roomNumber]) {
                studentDetailsFormat[hall][wing][roomNumber] = [];
            }
            studentDetailsFormat[hall][wing][roomNumber].push(studentDetail);
        });
        //Store data in files
        await storeDataHandler(studentDetailsFormat);

        res.send({"message":"Data Saved Successfully"});
    }
    else{
        res.status(404).json({ message : "Data Not Received"});
    }
});

app.get('/',async (req,res)=>{
    try {
        let studentDetails = await fs.readFile('data.json', 'utf8');
        studentDetails = JSON.parse(studentDetails);

        res.send({ "message": "success", studentDetails });
    } catch (err) {
        console.error(err);
        res.status(500).send({ "message": "error" });
    }
    
});

// Wing Endpoint
app.get('/:wing',async (req,res)=>{
    try {

        const wing = req.params.wing;
        let studentDetails = await fs.readFile('data.json', 'utf8');
        studentDetails = JSON.parse(studentDetails);

        const requiredStudent = {};
        
        for(let hall in studentDetails){
            if(studentDetails[hall][wing]){
                if(!requiredStudent[hall]){
                    requiredStudent[hall] = [];
                }
                requiredStudent[hall] = studentDetails[hall][wing];
            }
        }
        res.send({ "message": "success", requiredStudent });
    } catch (err) {
        console.error(err);
        res.status(500).send({ "message": "error" });
    }
});

// WingiesOrNot Endpoint
app.post('/WingiesOrNot',async (req,res)=>{
    try {

        const studentOne = req.body.studentOne;
        const studentTwo = req.body.studentTwo;
        if(!studentOne || !studentTwo){
            res.send({'message' : 'Please provide RollNo in body'});
            return;
        }
        let studentDetails = await fs.readFile('data.json', 'utf8');
        studentDetails = JSON.parse(studentDetails);

        let hallStudentOne = "";
        let hallStudentTwo = "";
        let wingStudentOne = "";
        let wingStudentTwo = "";
        
        for(let hall in studentDetails){
            for(let wing in studentDetails[hall]){
                for(let room in studentDetails[hall][wing]){
                    for(const student of studentDetails[hall][wing][room]){
                        if(student['i']===studentOne){
                            hallStudentOne = hall;
                            wingStudentOne = wing;
                        }
                        if(student['i']===studentTwo){
                            hallStudentTwo = hall;
                            wingStudentTwo = wing;
                        }
                    }
                    
                }
            }
        }
        if(hallStudentOne===hallStudentTwo && wingStudentOne===wingStudentTwo){
            res.send({"message" : "Wingies"});
        }
        else res.send({ "message": "Not Wingies"});
    } catch (err) {
        console.error(err);
        res.status(500).send({ "message": "error" });
    }
})
app.listen(3000,()=>{
    console.log('App is running on port 3000');
});