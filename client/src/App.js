import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register'; 
import Login from './pages/Login';
import LoginOTP from './pages/LoginOTP';
import ForgotEmail from './pages/ForgotEmail';
import Password from './pages/Password';
import ForgetOTP from './pages/ForgetOTP';
import Home from './pages/Home';
import MakeQuiz from './pages/MakeQuiz';
import Quiz from './pages/Quiz';
import SingleQuiz from './pages/SingleQuiz';
import RandomQuiz from './pages/RandomQuiz';
import Marks from './pages/Marks';
import AnswerQuiz from './pages/AnswerQuiz';
import EditQuiz from './pages/EditQuiz';


function App() {
  const[registerOtp,setregisterOtp] =useState(null);
  const[forgetOtp,setForgettOtp] =useState(null);
  const[marks,setMarks]=useState();
  const[question,setQuestion1]=useState();
  const[answer,setAnswer1]=useState();
  const[qLength,setLength]=useState()
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register registerOtp={registerOtp} setregisterOtp={setregisterOtp}/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/otp1' element={<LoginOTP registerOtp={registerOtp}/>} />
        <Route path='/foremail' element={<ForgotEmail setForgettOtp={setForgettOtp} />} />
        <Route path='/password' element={<Password forgetOtp={forgetOtp}/>} />
        <Route path='/otp2' element={<ForgetOTP forgetOtp={forgetOtp} />} />
        <Route path='/' element={<Home/>} />
        <Route path='/makequiz' element={<MakeQuiz/>}/>
        <Route path='/quiz/:cat' element={<Quiz/>} />
        <Route path='/single/:id' element={<SingleQuiz/>}/>
        <Route path='/quizzes' element={<RandomQuiz setMarks={setMarks} setQuestion1={setQuestion1} setAnswer1={setAnswer1} setLength={setLength}/>}/>
        <Route path='/marks' element={<Marks marks={marks} qLength={qLength}/>}/>
        <Route path='/answer' element={<AnswerQuiz question={question} answer={answer}/>}/>
        <Route path='/edit/:id' element={<EditQuiz/>}/>
      </Routes>
    </Router>
  );
}

export default App;
