// Loading.js
import React from 'react';
import './Loading.css';
import StarBackground from './StarBackground';
const Loading = () => {
    return (
        <div className='bg-transparent'>
        <div className="flex h-screen justify-center items-center">
            
            <div className="flex items-center p-2">
                <div className="w-2.5 h-10 bg-blue-900 m-1 shadow-lg animate-loading-1"></div>
                <div className="w-2.5 h-10 bg-blue-900 m-1 shadow-lg animate-loading-2"></div>
                <div className="w-2.5 h-10 bg-blue-900 m-1 shadow-lg animate-loading-3"></div>
            </div>
        </div>
        </div>
    );
};

export default Loading;
