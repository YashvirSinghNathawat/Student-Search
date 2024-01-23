import { useEffect, useState } from 'react'

// PLEASE Follow steps given in README.md
// NOTE: Copy Token from PClub website here
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImJhYXNfZG9tYWluX2lkIjoiNjQwYTkzMjk5ZTc1Mzg0OWNmM2JmNzIyIiwiZXhwIjoxNzA2MDE3NjM1LCJpYXQiOjE3MDYwMTU4MzUsImlzcyI6IjY1YWZiYzViMjMzZTEyNjc5MTVkZTI0YSIsInN0aXRjaF9kZXZJZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInN0aXRjaF9kb21haW5JZCI6IjY0MGE5MzI5OWU3NTM4NDljZjNiZjcyMiIsInN1YiI6IjY0MGIyMDhjMzYwOGQxNWU1OGRmMDU5MSIsInR5cCI6ImFjY2VzcyJ9.SkUH2B9-j2Fx0QQLYGISEeEqouL9TLXy-O232TThbn4';

function App() {
  const url = 'https://ap-south-1.aws.data.mongodb-api.com/app/data-yubip/endpoint/data/v1/action/find';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  };
  const body = {
    dataSource: 'Cluster0',
    database: 'student_data',
    collection: 'student_data',
    filter: {},
    limit: 30000
    
  };
  useEffect(()=>{
    fetch(url,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then((response)=>response.json()).
    then(data=>{
      console.log(data);
      const studentDetails = JSON.stringify({
        data
      });
      fetch('http://localhost:3000/studentSearch',{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body:studentDetails 
      }).then(res=>res.json()).
      then(data=>console.log(data))
    });
  },[]);
  return (
    <>
      Front End Only to get Fetch data from PClub Student Search to backend!!
    </>
  )
}

export default App
