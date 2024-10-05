import React, { useState, useEffect } from 'react';
import './Progress.css'
import { useNavigate } from 'react-router-dom';
const CircularProgress = ({ percent,qLength }) => {
    const navigate=useNavigate()
    if(!percent){
        navigate('/')
    }
    const finalPercent=(percent*10/qLength).toPrecision(4);
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const [percentage, setPercentage] = useState(0);
    let stroke= "#008000";
    let comment='Excellent';
let colorClass = `text-green-700`;

    if (percent <= 30) {
        stroke = "#ff0000"; 
        comment='Needs Improvement';
        colorClass='text-red-700';
    } else if (percent <= 50 && percent>30) {
        stroke = "#ffa500";
        comment='Could be Better';
        colorClass='text-orange-400';
    } else if (percent <= 80 && percent>50) {
        stroke = "#ffff00";
        comment='Good Progress';
        colorClass='text-yellow-300';
    } else {
        stroke = "#008000"; 
        comment='Excellent';
    }

    useEffect(() => {
        let start = 0;
        const end = percent;
        const duration = 1000;
        const incrementTime = percent / duration;

        const interval = setInterval(() => {
            if (start < end) {
                start++;
                setPercentage(start);
            } else {
                clearInterval(interval);
            }
        }, incrementTime);

        return () => clearInterval(interval);
    }, [percent]);

    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <>
        <div className="flex items-center justify-center relative">
            <svg width="250" height="250">
                <circle
                    cx="125"
                    cy="125"
                    r={radius}
                    fill="none"
                    stroke="#f2f5f5"
                    strokeWidth="12"
                />

                <circle
                    cx="125"
                    cy="125"
                    r={radius}
                    fill="none"
                    stroke={stroke}
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 125 125)"
                    className="transition-all duration-1000 ease-in-out"
                />
            </svg>
            <div className="absolute text-blue-300 text-3xl font-bold scale-animation ">{finalPercent}%</div>
        </div>
        <div className='mb-3'><span className={`text-blue-300 text-3xl font-bold`}>{percent/10}</span><span className='text-4xl text-blue-300 font-bold '>/{qLength}</span> </div>
        <div className={`text-center ${colorClass} text-2xl font-bold `}>
            {comment}
        </div>
        </>
    );
};

export default CircularProgress;
