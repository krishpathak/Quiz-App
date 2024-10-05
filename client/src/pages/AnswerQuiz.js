import React, { useState } from 'react'
import StarBackground from '../components/StarBackground'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const AnswerQuiz = ({question,answer}) => {
    const navigate=useNavigate();
    if(!question|| !answer){
        navigate('/')
    }
    const [loading, setLoading] = useState(false);
    const handleOnClick=()=>{
        navigate('/')
    }
    return (
        <div className=' text-blue-200  h-screen'>
            <StarBackground />
            <Navbar />
            <h1 className='text-3xl text-center font-extrabold text-blue-300'>Questions</h1>
            {loading ? <Loading/> :question &&question.map((q,index)=>{
                return(
                    <div className='border bg-white mt-4 bg-opacity-5 backdrop-blur-lg p-4 mx-auto md:mx-48 rounded-3xl'>
                
                    <p className='text-white text-2xl ml-auto'>{index+1}. {q.question}</p>
                    <button className={`option border flex w-60 text-black rounded-xl my-4 h-12 ${q.correct === 'a' ? 'bg-green-600' : (answer[index+1]==='a'?'bg-red-600':'bg-white')}`} name='a' >
                        <p className='mt-3 ml-4'>A. {q.a} </p>
                    </button>
                    <button className={`option border flex w-60 text-black rounded-xl my-4 h-12 ${q.correct === 'b' ? 'bg-green-600' : (answer[index+1]==='b'?'bg-red-600':'bg-white')}`} name='b'>
                        <p className='mt-3 ml-4' >B. {q.b}  </p>
                    </button>
                    <button className={`option border flex w-60 text-black rounded-xl my-4 h-12 ${q.correct === 'c' ? 'bg-green-600' : (answer[index+1]==='c'?'bg-red-600':'bg-white')}`} name='c'>
                        <p className='mt-3 ml-4' >C. {q.c} </p>
                    </button>
                    <button className={`option border flex w-60 text-black rounded-xl my-4 h-12 ${q.correct === 'd' ? 'bg-green-600' : (answer[index+1]==='d'?'bg-red-600':'bg-white')}`} name='d'>
                        <p className='mt-3 ml-4' >D. {q.d}</p>
                    </button>
                </ div >
                )
            }) }
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold ml-3 py-2 px-2 rounded mb-3 mt-3 mx-auto md:mx-48' onClick={handleOnClick}>Back</button>
        </div>
    )
}

export default AnswerQuiz
