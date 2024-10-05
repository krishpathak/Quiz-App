import React from 'react'
import StarBackground from '../components/StarBackground'
import Navbar from '../components/Navbar'
import CircularProgress from '../components/CircularProgress';
import { useNavigate } from 'react-router-dom';

const Marks = ({marks,qLength}) => {
    const navigate=useNavigate();
    if(!marks){
        navigate('/');
    }
    const onHandleSubmit=()=>{
        navigate('/')
    }
    const onHandleSubmit1=()=>{
        navigate('/answer')
    }
  return (
    <div className='flex flex-col text-center justify-center  text-blue-200 h-screen '>
      <StarBackground/>
      <Navbar/>
      <div className='bg-white bg-opacity-5 backdrop-blur-lg border p-4 md:mx-48 mx-auto rounded-lg'>
        <h1 className='text-blue-300 text-3xl font-extrabold'>Marks Statistics</h1>
        <div>
        <CircularProgress percent={marks*10} qLength={qLength}/>
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-2 rounded mx-auto md:mx-48' onClick={onHandleSubmit1}>Evaluation</button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-2 rounded mx-auto md:mx-48' onClick={onHandleSubmit}>Return</button>
        
      </div>
    </div>
  )
}

export default Marks
