require('./GoogleOAuth/googleoauth')
const connectToMongo = require('./db');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const port=8000;
const session = require('express-session');
const passport = require('passport');
const cors= require('cors');
app.use(cookieParser());
app.use(express.json());
require('dotenv').config()
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
         secure: false,
         expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
         httpOnly: true
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
))
connectToMongo();

app.get('/createToken/:token' ,(req,res)=>{
    try{
    // console.log(req.params.token)
    res.cookie('quiz_app_token',String(req.params.token),{
         maxAge:24*60*60*7*1000*3,
     }).json({message:"success"})
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message})
    }
})
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/register' }),
    (req, res) => {
         const {authToken}=req.user;
        //  console.log(req.user);
         res.cookie('quiz_app_token',String(authToken),{
              maxAge:24*60*60*7*1000*3,
          })
          res.redirect(`http://localhost:3000/`);
    });
app.use('/auth',require('./routes/user'))
app.use('/quiz',require('./routes/quiz'))
app.get('/',(req,res)=>{
    res.send("hehe!!server is running");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})