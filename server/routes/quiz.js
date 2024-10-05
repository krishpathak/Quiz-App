const express= require('express');
const verifyToken = require('../middleware/verifyToken');
const Quiz = require('../models/Quiz');
const router=express.Router();

router.post('/postquiz',verifyToken,(req,res)=>{
    try{
        const {question, a,b,c,d, correct, category} = req.body;
        if(!question||!a||!b||!c||!d||!correct||!category){
            return res.status(400).json({message: 'Please fullfill everything'});
        }
        const data=new Quiz({
            question,
            a,
            b,
            c,
            d,
            correct,
            category,
            author:req.id
        })
        data.save();
        if(data){
            return res.status(201).json({yeye: 'Quiz question added successfully'});
        }

    }catch(err){
        console.log(err);
        return res.status(400).json({message:"An server error has been occured"})
    }
})

router.get('/getquiz/:cat',async (req,res)=>{
    try{
        const quiz=await Quiz.find({category:req.params.cat})
        res.status(200).json({quiz})
    }catch(err){
        console.log(err);
        return res.status(400).json({message:"An server error has been occured"})
    } 

})
router.get('/find/:id',async(req,res)=>{
    try{
        const quiz=await Quiz.findById(req.params.id)
        if(!quiz){
            return res.status(404).json({message: 'Quiz not found'})
        }
        res.status(200).json({quiz})
    }catch(err){
        console.log(err);
        return res.status(400).json({message:"An server error has been occured"})
    }
})
router.post('/logout', verifyToken,async (req, res) => {
    try {
        res.clearCookie('quiz_app_token');
        return res.json({ message: "Cookie cleared" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.get('/getquiz',verifyToken,async(req,res)=>{
    try{
        const quiz=await Quiz.aggregate([{$sample:{size:10}}]);
        res.status(200).json({quiz})
    }catch(err){
        console.log(err);
        return res.status(400).json({message:"An server error has been occured"})
    }
})

router.put('/update/:id',verifyToken, async(req,res)=>{
    try{
        const quiz=await Quiz.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!quiz){
            return res.status(404).json({message: 'Quiz not found'})
        }
        const {question, a,b,c,d, correct, category} = req.body;
        if(!question||!a||!b||!c||!d||!correct){
            return res.status(400).json({message: 'Please fullfill everything'});
        }
        res.status(200).json({okay:'123'})
    }catch(e){
        console.log(e);
        return res.status(400).json({message:"An server error has been occured"})
        
    }
})

router.delete('/delete/:id',verifyToken, async(req,res)=>{
    try{
        const quiz=await Quiz.findByIdAndDelete(req.params.id);
        if(!quiz){
            return res.status(404).json({message: 'Quiz not found'})
        }
        res.status(200).json({okay:'123'})
    }
    catch(err){
        console.log(err);
        return res.status(400).send({message:"Some error has been occured"});
    }
})

module.exports=router;