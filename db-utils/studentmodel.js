import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    studentId:{
        type:String,
        require:true
    },
    studentname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    mentorsname:{
        type:String,
        require:true
    },
    previousmentor:{
        type:String,
        require:true
    }
   
})
const student = mongoose.model('student', studentSchema)

export { student }