const mongoose =require('mongoose')
const mongoURI=process.env.MONGO_URL;

const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Succesfully connected to MongoDB")}
    ).catch((err)=>{
        console.log(err);
        console.log("Error connecting to mongoDB")}
    )
}

module.exports=connectToMongo