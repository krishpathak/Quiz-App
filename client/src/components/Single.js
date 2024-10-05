import React, { useEffect, useState } from 'react'
import BACKEND_URL from '../url';

const Single = ({question}) => {
    const[author,setAuthor]=useState('no author');
    const questiondate= new Date(question.date)
    const ms=+questiondate
    const date=new Date();
    const nms=+date;
    const days = Math.floor((nms-ms) / (1000 * 60 * 60 * 24));
    useEffect(()=>{
        const getAuthor=async ()=>{
            const response=await fetch(BACKEND_URL+`auth/${question.author}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                }
            })
            const data= await response.json();
            // console.log(data);
            setAuthor(data.username);
        }
        getAuthor();
    })
      return (
        <div className="bg-white bg-opacity-5 border mt-3 border-white rounded-lg p-4 backdrop-blur-lg text-blue-200 mb-3 mx-10 md:mx-32 shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Question</h1>
        <p className="text-lg mb-4">{question.question}</p>
        <div className="flex flex-row justify-between text-sm text-gray-100">
            <p>{days} days ago</p>
            <p>By <span className="font-semibold text-blue-500">{author}</span></p>
        </div>
    </div>
    
  )
}

export default Single
