import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Option from '../components/Option';
import StarBackground from '../components/StarBackground';
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { GoogleGenerativeAI } from "@google/generative-ai"
import Loading from '../components/Loading';
import BACKEND_URL from '../url';
// require('dotenv').config()
const SingleQuiz = () => {
    const navigate = useNavigate();
    const [on, seton] = useState(false);
    const location = useLocation();
    const [author, setAuthor] = useState();
    const [question, setquestion] = useState({ question: '', a: '', b: ' ', c: '', d: '', correct: '' });
    const [loading, setLoading] = useState(true);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [isAuthor, setisAuthor] = useState();
    const id = location.pathname.split('/')[2];
    const [date, setDate] = useState(false);
    const[info,setInfo]=useState('');
    const apiKey=process.env.REACT_APP_GOOGLE_GENERATIVE_API
    useEffect(() => {
        const getAuthor = async () => {
            if (question.author) {
                const response = await fetch(BACKEND_URL+`auth/${question.author}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const data = await response.json();
                // console.log(data);
                setAuthor(data.username);

            }
        }
        getAuthor();
    }, [loading])
    useEffect(() => {
        const getQuestion = async () => {
            const url = BACKEND_URL+`quiz/find/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setquestion(json.quiz);
            const inputDate = new Date(json.quiz.date);
            const options = { month: 'short', day: '2-digit', year: 'numeric' };
            const date1 = inputDate.toLocaleDateString('en-US', options);
            setDate(date1);
            setLoading(false);
            // console.log(question)
        }
        getQuestion()
    }, [loading])
    const correct = question.correct;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const onHandleClick = async (e) => {
        if (e.target.name == correct) {
            const style = e.currentTarget.style;
            style.backgroundColor = 'green';
            const retry = document.getElementById('retry');
            retry.style.display = 'block';
            const retry1 = document.getElementById('retry1');
            retry1.style.display = 'block';
            seton(true);
        } else {
            const style = e.currentTarget.style;
            style.backgroundColor = 'red';
            const cor = document.getElementsByName(correct);
            cor[0].style.backgroundColor = 'green';
            const retry = document.getElementById('retry');
            retry.style.display = 'block';
            const retry1 = document.getElementById('retry1');
            retry1.style.display = 'block';
            seton(true);
        }

    }
    const onRetry = () => {
        setInfo('');
        seton(false)
        const option = document.getElementsByClassName('option');
        for (let i = 0; i < option.length; i++) {
            option[i].style.backgroundColor = 'white';
        }
        const retry = document.getElementById('retry');
        retry.style.display = 'none';
        const retry1 = document.getElementById('retry1');
        retry1.style.display = 'none';
    }
    useEffect(() => {
        if (!loading) {
            const cheakUser = async () => {
                const url = BACKEND_URL+`auth/check/${question.author}`
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const json = await response.json();
                // console.log(json);
                if (json.message == 'true') {
                    setisAuthor(true);
                } else {
                    setisAuthor(false);
                }

            }
            cheakUser();
        }
    }, [loading])
    const handleOnEdit = (id) => {
        navigate(`/edit/${id}`)
    }
    const handleOnDelete = async (id) => {
        const url =    BACKEND_URL+`quiz/delete/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        const data = await response.json();

        if (data.okay == 123) {
            navigate('/')
        }
        if (data.message) {
            alert(data.message)
        }
    }
    const getMoreInfo=async()=>{
        setLoadingInfo(true)
        const prompt = question.question;
        const result = await model.generateContent([prompt]);
        const message = await result.response.text();
        // console.log(message)
        setInfo(message);
        setLoadingInfo(false)
        window.scrollBy({
            top: document.body.scrollHeight,
            behavior:'smooth'
        })
    }
    const cancel=()=>{
      setInfo('');
    }
    return (
        <div className='flex flex-col text-center justify-center text-blue-200 '>
            <div className='text-black'>.</div>
            <StarBackground />
            <Navbar />
            {loading ? <div><Loading/></div> : <div className='border bg-white bg-opacity-5 mt-16 backdrop-blur-lg p-4 mx-auto w-auto md:w-96'>
                <h1 className='text-2xl text-white font-extrabold '>Single Quiz</h1>
                <p className='text-white text-3xl'>{question.question}</p>
                <button className='option bg-white border border-black flex justify-center w-48 mx-auto  text-black rounded-xl my-4 h-12' onClick={onHandleClick} name='a' disabled={on}>
                    <p className='mt-3'>A. {question.a}</p>
                </button>
                <button className='option bg-white border border-black flex justify-center w-48 mx-auto  text-black rounded-xl my-4 h-12' onClick={onHandleClick} name='b' disabled={on}>
                    <p className='mt-3' >B. {question.b}</p>
                </button>
                <button className='option bg-white border border-black flex justify-center w-48 mx-auto  text-black rounded-xl my-4 h-12' onClick={onHandleClick} name='c' disabled={on}>
                    <p className='mt-3' >C. {question.c}</p>
                </button>
                <button className='option bg-white border border-black flex justify-center w-48 mx-auto  text-black rounded-xl my-4 h-12' onClick={onHandleClick} name='d' disabled={on}>
                    <p className='mt-3' >D. {question.d}</p>
                </button>
                <p className='text-gray-400 text-lg'>Author: {author}</p>
                <p className='text-gray-400 text-lg'>Posted On: {date}</p>
                {isAuthor && <div className='flex flex-row mx-auto justify-evenly'><HiOutlinePencilAlt className='mx-auto cursor-pointer border border-gray-400 w-10 h-10 p-2 rounded-full hover:text-blue-300' onClick={() => handleOnEdit(question._id)} /><MdDelete className='mx-auto cursor-pointer border border-gray-400 w-10 h-10 p-2 rounded-full hover:text-blue-300' onClick={() => handleOnDelete(question._id)} /></div>}
                <div className='flex flex-row'><button id='retry' className='bg-blue-600 px-3 rounded-lg mx-auto hover:bg-blue-500 transition-all duration-700 ' style={{ display: 'none' }} onClick={onRetry}>Retry</button>
                <button id='retry1' className='bg-blue-600 p-3 rounded-lg mt-3 mx-auto hover:bg-blue-500 transition-all duration-700 ' style={{ display: 'none' }} onClick={getMoreInfo}>Get more Info</button></div>
            </div>
            }
            {loadingInfo ? (
                <Loading/>
            ) : (
                info && <div className='border bg-white  bg-opacity-5 mt-20 rounded-lg backdrop-blur-lg p-4 mx-auto mb-3 w-auto md:w-5/6 text-blue-300'>
                    {info && <div><h1 className='text-2xl text-white font-extrabold'>Generated Info</h1>
                    <p>{info}</p>
                    <button className='bg-blue-600 p-3 rounded-lg mt-3 mx-auto hover:bg-blue-500 transition-all duration-700 ' onClick={cancel}>Cancel</button></div>}
                    </div>
            )}

        </div>
    )
}

export default SingleQuiz
