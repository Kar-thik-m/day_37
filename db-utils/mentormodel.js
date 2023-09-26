import mongoose from "mongoose";
const mentorSchema = new mongoose.Schema({
    mentorId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    emailid:{
        type: String,
        required: true
    },
    studentids:{
        type:[String],
        require:true
    },

})
const mentor = mongoose.model('Mentor', mentorSchema)

export { mentor }