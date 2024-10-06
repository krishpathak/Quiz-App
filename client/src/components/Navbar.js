import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../url';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const token = document.cookie.includes('quiz_app_token');
    useEffect(() => {
        console.log(document.cookie);
    })

    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const onHandleClick = () => {
        {
            navigate('/makequiz')
        }
    }
    const Logout = async () => {
        const url = BACKEND_URL + 'quiz/logout';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        const json = await response.json();
        navigate('/')
    }
    const Login = () => {
        navigate('/login')
    }
    const onHandleClick1 = () => {
        navigate('/quizzes')
    }
    return (
        <div className='mb-16'>
            <nav className="bg-white dark:bg-black fixed w-full z-20 top-0 start-0 border-b border-blue-200 dark:border-blue-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
                    <a href='/'><h1 className='text-xl font-extrabold text-blue-300'>Quizzy</h1></a>

                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {token ? (
                            <div className='flex fleex-row justify-between'>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 mr-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-300 hover:text-black transition-all duration-700  dark:focus:ring-blue-800" onClick={onHandleClick1}>Take Quiz</button>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 mr-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-300 hover:text-black transition-all duration-700  dark:focus:ring-blue-800" onClick={onHandleClick}>Make Quiz</button>

                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-300 hover:text-black transition-all duration-700  dark:focus:ring-blue-800" onClick={Logout}>Logout</button>
                            </div>
                        ) : (
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-300 hover:text-black transition-all duration-700  dark:focus:ring-blue-800" onClick={Login}>Login</button>
                        )}

                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-blue-500 rounded-lg md:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-blue-400 dark:hover:bg-blue-300 hover:text-black transition-all duration-700  dark:focus:ring-blue-600"
                            aria-controls="navbar-sticky"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                    <div className={`items-center justify-between ${isOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-blue-100 rounded-lg bg-blue-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-blue-800 md:dark:bg-black dark:border-blue-700">
                            <li><a href="/quiz/maths" className="block py-2 px-3 text-blue-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-2 dark:text-white dark:hover:bg-blue-300 hover:text-black transition-all duration-700 ">Maths</a></li>
                            <li><a href="/quiz/history" className="block py-2 px-3 text-blue-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-2 dark:text-white dark:hover:bg-blue-300 hover:text-black transition-all duration-700 ">History</a></li>
                            <li><a href="/quiz/tech" className="block py-2 px-3 text-blue-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-2 dark:text-white dark:hover:bg-blue-300 hover:text-black transition-all duration-700 ">Sci & Tech</a></li>
                            <li><a href="/quiz/logic" className="block py-2 px-3 text-blue-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-2 dark:text-white dark:hover:bg-blue-300 hover:text-black transition-all duration-700 ">Logic</a></li>
                            <li><a href="/quiz/gk" className="block py-2 px-3 text-blue-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-2 dark:text-white dark:hover:bg-blue-300 hover:text-black transition-all duration-700 ">GK</a></li>
                            <li><a href="/quiz/current" className="block py-2 px-3 text-blue-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-2 dark:text-white dark:hover:bg-blue-300 hover:text-black transition-all duration-700 ">Current Affairs</a></li>
                            <li><a href="/quiz/other" className="block py-2 px-3 text-blue-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-2 dark:text-white dark:hover:bg-blue-300 hover:text-black transition-all duration-700 ">Others</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
