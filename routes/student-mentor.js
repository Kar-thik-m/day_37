import express from "express";
import { student as studentmodel } from "../db-utils/studentmodel.js";
import { mentor as mentormodel } from "../db-utils/mentormodel.js";
import { v4 } from "uuid";


const studentmentorRouter = express.Router();
//create mentor

studentmentorRouter.post('/mentor', async (req, res) => {
     try {
          const payload = req.body;
          const repeat = await mentormodel.findOne({ mentorId: payload.mentorId });

          if (repeat) {
               return res.status(409).send("Already found. Please try another ID.");
          }

          const mentor = new mentormodel(payload);
          await mentor.save();
          res.status(201).send({ msg: "Mentor created successfully" });
     } catch (error) {
          console.error(error);
          res.status(500).send({ msg: "Internal server error" });
     }
});

//create student
studentmentorRouter.post("/student", async (req, res) => {
     try {
          const idfound = await studentmodel.findOne({ studentId: req.body.studentId });
          const emailfound = await studentmodel.findOne({ email: req.body.email });
          if (idfound) {
               return res.status(409).send("alreaty found try another id");
          }
          if (emailfound) {
               return res.status(409).send("alreaty found try another email");
          }

          const student = new studentmodel(req.body)
          await student.save();
          res.send({ msg: "create student successfull" });
     } catch (error) {

          res.status(500).send({ msg: " create student error" });

     }

});


//add student to mentor

studentmentorRouter.put("/student-mentor/:mentorId", async (req, res) => {

     try {
          //const payload = req.body;
          const { mentorId } = req.params;
          const { studentId } = req.body;

       const add=   await mentormodel.updateMany({ mentorId: mentorId }, { $push: { studentids: studentId } });
         if(add.studentId===studentId){
          return res.send({err:"allready add a student"})
         }
          res.send({ msg: "add successful" });
     } catch (error) {
          res.status(500).send({ msg: "not add error" });
     }
})



studentmentorRouter.put('/assign-mentor/:studentId', async (req, res) => {
     try {
          const { studentId } = req.params;
          const updatedData = req.body;

          const result = await studentmodel.findOneAndUpdate(
               { studentId: studentId },
               { $set: updatedData }
               
          );

          if (!result) {
               return res.status(404).json({ error: 'Student not found' });
          }

          res.json({ message: 'Mentor assigned/changed successfully.', new: result });
     } catch (error) {
          
          res.status(500).json({ error: 'Server error' });
     }
});





studentmentorRouter.get('/all-studentsmento/:mentorId', async (req, res) => {
  try {
    const { mentorId } = req.params;

    const students = await mentormodel.findOne({ mentorId: mentorId },{name:1,studentids:1});

    res.json(students);
  } catch (error) {
    
    res.status(500).json({ error: 'Server error' });
  }
});



studentmentorRouter.get('/previous-mentor/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    
    
    const previousMentor=await studentmodel.findOne({studentId:studentId},{studentname:1,previousmentor:1,_id:0});

    if(!previousMentor){
     return res.send({msg:"not found"});
    }

    res.json( previousMentor ); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});







export default studentmentorRouter;