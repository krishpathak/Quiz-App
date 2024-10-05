import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useLocation } from 'react-router-dom'
import Single from '../components/Single';
import StarBackground from '../components/StarBackground';
import Loading from '../components/Loading';
import BACKEND_URL from '../url';

const Quiz = () => {
    const [cat, setcategories] = useState();
    const [loading, setLoading] = useState(true);
    const [question, setquestion] = useState();
    const location = useLocation();
    useEffect(() => {
        setcategories(location.pathname.slice(6));
    }
        , [])

    useEffect(() => {
        if (!cat) {
            return;
        }
        const getQuiz = async () => {
            const url = BACKEND_URL+`quiz/getquiz/${cat}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }, credentials: 'include'
            });
            const data = await response.json();
            setquestion(data.quiz);
            // console.log(question)
            setLoading(false);
            // console.log(Array.isArray(question))
        }
        getQuiz();
    }, [cat, loading])
    return (
        <div className=' h-screen'>
            <StarBackground/>
            <Navbar />
            <h1 className='text-3xl text-center font-extrabold mb-6 text-blue-300'>Question of {cat}</h1>
            <div className='mt-5'>
                {
                    loading ?
                        <Loading/>
                        :
                        Array.isArray(question) && question.map((q) => (
                            <Link to={`/single/${q._id}`}>
                                <Single question={q} />
                            </Link>
                        ))
                }
            </div>

        </div>
    )
}

export default Quiz
