# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Format of Data Stored of Y23
    {
        'HallNo' : {
            'Wing':{
                'Room No.' : [
                    {studentOne},
                    {studentTwo}
                ]
            }
        }
    }

# Steps to run :
## Run /backend
1. cd /backend
2. npm install
3. node index.js

## Run FrontEnd to fetch data
1. npm install
2. npm run dev

## Copy authentication token from PClub Student Search Website
![Screenshot](token.PNG)
1. Copy token in /src/App.jsx in variable named 'token'
2. Open website http://localhost:5173/

## To test api in Postman
1. Note : /studentSearch endpoint will directly fetch data from PClub Student Search<br>
            Also fetch data is stored in 'data.json' in backend directory
2. Endpoint: / is Get Api to fetch all data<br>
    Request Type : GET
3. Endpoint: /:wing is used to fetch data from a wing.<br>
    Request Type : GET<br>
    Params Required: Wing<br>
    Returns: For each hall it returns student of :wing in format {'Hall' : {'Room No' : [Student Detail]}}
4. Endpoint: /WingiesOrNot It returns whether two people are of same wing or not<br>
    Request Type : POST<br>
    Body Required: studentOne and studentTwo which are id's of two student<br>
                Example: {<br>
                   "studentOne" : "231110052",<br>
                    "studentTwo": "231110015"<br>
                }<br>