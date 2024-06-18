const Student = require("../models/student");
const {studentJoiSchema} = require("../../validator/allValidator");

exports.addNewStudent = async (req,res)=>{
    try{
      const {error} = studentJoiSchema.validate(req.body);
      if(error){
          return res.status(400).json({message:error.details[0].message});
      }
      
      const student = new Student({
        studentDetails:{
          firstName:req.body.studentDetails.firstName,
          lastName:req.body.studentDetails.lastName,
          gender:req.body.studentDetails.gender,
          dob:req.body.studentDetails.dob,
          email:req.body.studentDetails.email,
          mobileNumber:req.body.studentDetails.mobileNumber,
          address:req.body.studentDetails.address,
          studentId:req.body.studentDetails.studentId,
          rollNumber:req.body.studentDetails.rollNumber,
        },
        parentDetails:{
          firstName:req.body. parentDetails.firstName,
          lastName:req.body. parentDetails.lastName,
          mobileNumber:req.body. parentDetails.mobileNumber
        },
        courseDetails:{
          courseName:req.body.courseDetails.courseName,
          session:req.body.courseDetails.session
        },
        admissionFees:req.body.admissionFees,
        paymentDue:req.body.admissionFees
      })
      await student.save();
      return res.status(201).json({success:true, message:"New student  created  sucessfully"});

    }catch(error){
      return res.status(500).json({
          status:0,
          message:error.message.toString(),
      })
    }
  }