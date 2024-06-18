const Payment = require("../models/payment");
const Student = require("../../student/models/student");
const mongoose = require("mongoose");
const {studentFeesJoiSchema} = require("../../validator/allValidator");
exports.studentPayment = async (req,res)=>{
    try{
      const {error} = studentFeesJoiSchema.validate(req.body);
      if(error){
          return res.status(400).json({message:error.details[0].message});
      };
      
      const {studentId,firstName,lastName,rollNumber,amount,transactionId,phoneNumber,paymentType} = req.body;
    const findStudentData = await Student.findOne({ 'studentDetails.studentId': studentId });
    const userId = findStudentData.id
    const  userAmount = findStudentData.paymentDue;
    if(userAmount<amount){
       return res.status(400).json({status:false,message:"Insufficient Balance"})
    }
    if(amount===0){
        return res.status(400).json({status:false,message:"Amount 0 is not allow"});
      }
    const paymentdata = userAmount-amount  ;
      const studentPayment = new Payment ({
        studentId:userId,firstName,lastName,rollNumber,amount,transactionId,phoneNumber,paymentType
      })
      await studentPayment.save(); 

      const finddata = await Student.findByIdAndUpdate(userId,{paymentDue:paymentdata})
      return res.status(201).json({success:true, message:"Payment created  sucessfully"});

    }catch(error){
      return res.status(500).json({
          status:0,
          message:error.message.toString(),
      })
    }
  }

  exports.getAllPaymentHistory = async(req,res)=>{
    try{
        const getAllPaymentHistory = await Payment.find().populate("studentId")
        if(!getAllPaymentHistory){
            return res.status(400).json({
                success:false,
                message:"No any paymentHistory"
            })
        }
        return res.status(201).json({success:true, message:"Get all class sucessfully",getAllPaymentHistory}); 

    }catch(error){
        return res.status(500).json({
            status:0,
            message:error.message.toString(),
        })
    }

}