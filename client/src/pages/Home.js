import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import StarBackground from '../components/StarBackground'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate()
    const handleOnClick=()=>{
        navigate('/makequiz')
    }
    const handleOnClick1=()=>{
        navigate('/quizzes')
    }
    return (
        <>
        <Navbar />
            <StarBackground />
            <div className='  flex flex-col items-center mb-10 justify-center bg-white backdrop-blur-lg bg-opacity-5 mt-36 p-16 mx-auto md:mx-52 rounded-lg border border-white'>

                
                <div className='text-blue-200 justify-center text-center '><span className='font-extrabold text-5xl mb-5'>Welcome</span> <br></br><span className='font-bold text-4xl'> to Quizzy</span></div>
                <p className='text-blue-200 w-6/6 md:w-3/6 my-4 text-center'>
                    Welcome to Quizzy, your go-to destination for an engaging quiz experience! Here, you can create your own quizzes, challenge your friends, and test your knowledge across various subjects. Dive into a world of fun and learning as you explore quizzes tailored to your interests. Whether you're looking to enhance your skills or just have fun, Quizzy is the perfect platform for you. Join us and start your journey to becoming a quiz master!
                </p>

                <button className=' border border-blue-500  text-blue-500 hover:text-white transition-all duration-1000 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bg-transparent' onClick={handleOnClick}>Make Quiz &rarr;</button>
                <button className=' border border-blue-500  text-blue-500 hover:text-white transition-all duration-1000 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded bg-transparent' onClick={handleOnClick1}>Take Quiz &rarr;</button>
            </div>

        </>
    )
}

export default Home
