import React, { useEffect, useState } from 'react'
import StarBackground from '../components/StarBackground';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import BACKEND_URL from '../url';

const RandomQuiz = ({setMarks , setQuestion1,setLength,setAnswer1}) => {
    const [question, setQuestion] = useState(null);
    const token = document.cookie.includes('quiz_app_token');

    const navigate=useNavigate();
    useEffect(()=>{
        if(!token){
      navigate('/login')
        }
    },[])
    const [loading, setLoading] = useState(true);
    
    const [answer, setAnswer] = useState();
    let answers=[];
    let choosenAnswer=[];
    let marks=0;
    useEffect(() => {
        if(!question){
        const getQuestions = async () => {
            const url = BACKEND_URL+'quiz/getquiz';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await response.json();
            setQuestion(data.quiz);
            setLoading(false);
        }
        getQuestions();
    }
    }, [loading])
    useEffect(()=>{
        // console.log(question)
        if(question){
        for(let i=0;i<question.length;i++){
           answers.push({id:i,question:question[i].question,answer:question[i].correct});
        }}
        // console.log(answers);
        setAnswer(answers)
    },[question]);
    const handleOnChange=(e)=>{
        // console.log(e.target.name.slice(6))
        let a=parseInt(e.target.name.slice(6));
        choosenAnswer[a]=e.target.id;
        // console.log(choosenAnswer)
    }
    const onHandleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);
        for(let i=0;i<question.length;i++){
            if(choosenAnswer[i+1]==answer[i].answer){
                marks+=1;
            }
        }
        setMarks(marks)
        setQuestion1(question);
        setLength(question.length);
        setAnswer1(choosenAnswer);
        navigate('/marks')
        // choosenAnswer=[];

    }
    return (
        <div>
            <Navbar />
            <StarBackground />
            <h1 className='text-3xl text-center font-extrabold text-blue-300'>Random Quiz Test</h1>
            {loading ?<Loading/> :
                question && question.map((q,index) => {
                    return (<div className='bg-white bg-opacity-5 backdrop-blur-lg md:mx-48 mx-auto rounded my-4 border p-3 border-white'>
                        <div className='text-blue-300 text-xl'>{index+1}. {q.question} </div>
                        <div className='flex items-center my-2'>
                            <input type='radio' name={`option${index+1}`} id='a' className='mr-2 focus:ring-blue-600' onChange={handleOnChange}/>
                            <label htmlFor='a' className='text-lg text-blue-300' >{q.a}</label>
                        </div>
                        <div className='flex items-center my-2'>
                            <input type='radio' name={`option${index+1}`} id='b' className='mr-2 focus:ring-blue-600' onChange={handleOnChange}/>
                            <label htmlFor='b' className='text-lg text-blue-300' >{q.b}</label>
                        </div>
                        <div className='flex items-center my-2'>
                            <input type='radio' name={`option${index+1}`} id='c' className='mr-2 focus:ring-blue-600' onChange={handleOnChange}/>
                            <label htmlFor='c' className='text-lg text-blue-300' >{q.c}</label>
                        </div>
                        <div className='flex items-center my-2'>
                            <input type='radio' name={`option${index+1}`} id='d' className='mr-2 focus:ring-blue-600' onChange={handleOnChange}/>
                            <label htmlFor='d' className='text-lg text-blue-300' >{q.d}</label>
                        </div>
                    </div>
                    )
                })}
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold  py-4 px-2 rounded mb-3 mx-auto md:mx-48' onClick={onHandleSubmit}>Submit</button>
        </div>
    )
}

export default RandomQuiz
