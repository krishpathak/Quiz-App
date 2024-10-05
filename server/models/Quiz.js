const mongoose=require('mongoose');
const {Schema}=mongoose;

const QuizSchema=new Schema({
    question:{
        type:String,
        require:true
    },
    a:{
        type:String,
        require:true
    },
    b:{
        type:String,
        require:true
    },
    c:{
        type:String,
        require:true
    },
    d:{
        type:String,
        require:true
    },
    correct:{type:String,enum:['a','b','c','d']},
    category:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports=mongoose.models.Quiz||mongoose.model("Quiz",QuizSchema)