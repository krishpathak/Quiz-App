import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Alerts from '../components/alerts';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../url';

const MakeQuiz = () => {
    const token = document.cookie.includes('quiz_app_token');
    
    const navigate = useNavigate();
    useEffect(()=>{
        if (!token) {
            navigate('/login');
        }

    })
    const [category, setcategories] = useState();
    const [credentials, setcredentials] = useState({ question: '', a: '', b: '', c: '', d: '', correct: 'c' })
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    
    
    const Category = (e) => {
        setcategories(e.target.id)
    }
    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
        // console.log(credentials);
    }
    const showCustomAlert = (message, color) => {
        setAlertMessage(message);
        setShowAlert(true);
    };
    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const url = BACKEND_URL+"quiz/postquiz";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ question: credentials.question, a: credentials.a, b: credentials.b, c: credentials.c, d: credentials.d, correct: credentials.correct, category: category })
        })
        const json = await response.json();
        // console.log(json);
        if(json.message){
            showCustomAlert(json.message);
            setcredentials({ question: '', a: '', b: '', c: '', d: '', correct: 'c' })
            setcategories(null);
        }
        else{
            setcredentials({ question: '', a: '', b: '', c: '', d: '', correct: 'c' })
            navigate('/');
        }
    }
    return (
        
        <div className='bg-gray-950 mt-16'>
            {showAlert && <div className=''><Alerts message={alertMessage} onClose={handleCloseAlert}/></div>}
            <h1 className='text-center font-extrabold text-4xl py-8  text-blue-200'>Quiz Creation</h1>
            <div className='flex flex-col-reverse md:flex-row min-h-screen'>
                <Navbar />

                <div className='p-8 md:w-4/6'>
                    <h2 className='text-2xl font-semibold mb-4 text-blue-200'>Question</h2>
                    <textarea
                        className='w-full rounded-lg border-4 border-blue-900 text-black p-2 bg-blue-200'
                        cols={100}
                        rows={3}
                        name='question'
                        placeholder='Enter the question'
                        value={credentials.question}
                        onChange={handleChange}
                    ></textarea>

                    <div className='mt-6'>
                        <h2 className='text-2xl font-semibold text-blue-200'>Options</h2>
                        <div className='flex flex-col space-y-4 mt-4'>
                            <div className='flex items-center text-xl text-blue-200'>
                                A.
                                <input
                                    type='text'
                                    className='ml-3 rounded-lg border-4 border-blue-900 p-1 w-full bg-blue-200 text-black'
                                    placeholder='Enter the option A'
                                    id='a' name='a'
                                    value={credentials.a}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex items-center text-xl text-blue-200'>
                                B.
                                <input
                                    type='text'
                                    className='ml-3 rounded-lg border-4 border-blue-900 p-1 w-full bg-blue-200 text-black'
                                    placeholder='Enter the option B'
                                    id='b' name='b'
                                    value={credentials.b}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex items-center text-xl text-blue-200'>
                                C.
                                <input
                                    type='text'
                                    className='ml-3 rounded-lg border-4 border-blue-900 p-1 w-full bg-blue-200 text-black'
                                    placeholder='Enter the option C'
                                    id='c' name='c'
                                    value={credentials.c}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex items-center text-xl text-blue-200'>
                                D.
                                <input
                                    type='text'
                                    className='ml-3 rounded-lg border-4 border-blue-900 p-1 w-full bg-blue-200 text-black'
                                    placeholder='Enter the option D'
                                    value={credentials.d}
                                    id='d' name='d' onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-6'>
                        <h2 className='text-2xl font-semibold text-blue-200
                        '>Correct Option</h2>
                        <select id="options" className='mt-2 w-32 rounded-lg border-4 border-blue-900 p-1 bg-blue-200' name='correct' value={credentials.correct} onChange={handleChange}>
                            <option name='correct' value="a">A</option>
                            <option name='correct' value="b">B</option>
                            <option name='correct' value="c" selected>C</option>
                            <option name='correct' value="d">D</option>
                        </select>
                    </div>
                    <div className='flex justify-end -mt-8'>
                        <button className='bg-blue-500 hover:bg-blue-700 
                         text-white font-bold  py-4 px-2 rounded' onClick={handleOnSubmit}>
                            Submit Quiz
                        </button>
                    </div>
                </div>

                <div className='ml-6 border border-blue-900 h-96 p-8 rounded-2xl border-solid border-4 bg-blue-200 mr-6'>
                    <h2 className='text-2xl font-semibold mb-4 text-center'>Categories</h2>
                    <div className='flex items-center my-2'>
                        <input type='radio' name='category' id='maths' className='mr-2 focus:ring-blue-600' onChange={Category} />
                        <label htmlFor='maths' className='text-lg'>MATHEMATICS</label>
                    </div>
                    <div className='flex items-center my-2'>
                        <input type='radio' name='category' id='history' className='mr-2 focus:ring-blue-600' onChange={Category} />
                        <label htmlFor='history' className='text-lg'>HISTORY</label>
                    </div>
                    <div className='flex items-center my-2'>
                        <input type='radio' name='category' id='tech' className='mr-2 focus:ring-blue-600' onChange={Category} />
                        <label htmlFor='tech' className='text-lg'>SCIENCE & TECHNOLOGY</label>
                    </div>
                    <div className='flex items-center my-2'>
                        <input type='radio' name='category' id='logic' className='mr-2 focus:ring-blue-600' onChange={Category} />
                        <label htmlFor='logic' className='text-lg'>LOGICAL</label>
                    </div>
                    <div className='flex items-center my-2'>
                        <input type='radio' name='category' id='gk' className='mr-2 focus:ring-blue-600' onChange={Category} />
                        <label htmlFor='gk' className='text-lg'>GENERAL KNOWLEDGE</label>
                    </div>
                    <div className='flex items-center my-2'>
                        <input type='radio' name='category' id='current' className='mr-2 focus:ring-blue-600' onChange={Category} />
                        <label htmlFor='current' className='text-lg'>CURRENT AFFAIRS</label>
                    </div>
                    <div className='flex items-center my-2'>
                        <input type='radio' name='category' id='other' className='mr-2 focus:ring-blue-600' onChange={Category} />
                        <label htmlFor='other' className='text-lg'>OTHERS</label>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MakeQuiz
