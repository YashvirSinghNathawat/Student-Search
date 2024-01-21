import { useEffect, useState } from 'react'

function App() {
  const url = 'https://ap-south-1.aws.data.mongodb-api.com/app/data-yubip/endpoint/data/v1/action/find';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImJhYXNfZG9tYWluX2lkIjoiNjQwYTkzMjk5ZTc1Mzg0OWNmM2JmNzIyIiwiZXhwIjoxNzA1ODY0MTYwLCJpYXQiOjE3MDU4NjIzNjAsImlzcyI6IjY1YWQ2NGQ4ZGNkMzY0Y2FmMjdjY2VlOCIsInN0aXRjaF9kZXZJZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInN0aXRjaF9kb21haW5JZCI6IjY0MGE5MzI5OWU3NTM4NDljZjNiZjcyMiIsInN1YiI6IjY0MGIyMDhjMzYwOGQxNWU1OGRmMDU5MSIsInR5cCI6ImFjY2VzcyJ9.ll8OgYA-XNYGyh47fEyU8Mq4u5xyTh-bcOYUHXXQmSs'
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
      hELLO
    </>
  )
}

export default App
