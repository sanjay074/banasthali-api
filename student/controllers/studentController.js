const Student = require("../models/student");
const {studentJoiSchema} = require("../../validator/allValidator");

exports.addNewStudent = async (req,res)=>{
    try{
      const {error} = studentJoiSchema.validate(req.body);
      if(error){
          return res.status(400).json({message:error.details[0].message});
      }
      const {} = req.body
      // Create a new student document
      const student = new Student(req.body);
      await student.save();
      return res.status(201).json({success:true, message:"New student  created  sucessfully"});

    }catch(error){
      return res.status(500).json({
          status:0,
          message:error.message.toString(),
      })
    }
  }