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

  exports.getAllPayment = async(req,res)=>{
    try{
        const getAllPayment = await Payment.find().populate("studentId");;
        if(!getAllPayment){
            return res.status(400).json({
                success:false,
                message:"No any paymentHistory"
            })
        }
        return res.status(200).json({success:true, message:"Get all payment sucessfully",getAllPayment}); 

    }catch(error){
        return res.status(500).json({
            status:0,
            message:error.message.toString(),
        })
    }

}



exports.getAllPaymentHistory = async (req, res) => {
    try {
      const getAllPaymentHistory = await Payment.find()
        .populate('studentId')
        .sort({ createdAt: -1 }) 
        .limit(9); 
  
      if (getAllPaymentHistory.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No payment history found",
        });
      }
  
      const formattedPaymentHistory = getAllPaymentHistory.map((payment) => {
        const paymentObj = payment.toObject();
        paymentObj.id = paymentObj._id;
        delete paymentObj._id;
  
        if (paymentObj.studentId) {
          paymentObj.studentId.id = paymentObj.studentId._id;
          delete paymentObj.studentId._id;
        }
  
        return paymentObj;
      });
  
      return res.status(200).json({
        success: true,
        message: "Get all payment history successfully",
        getAllPaymentHistory: formattedPaymentHistory,
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message.toString(),
      });
    }
  };
exports.geOneUserPaymentHistory = async(req,res)=>{
  try{
      const studentId = req.params.id;
      if(!mongoose.Types.ObjectId.isValid(studentId)){
          return res.status(400).json({ success:false, message: "Invalid userId ID" });
        }
      const userHistory  = await Student.findById(studentId);
      if(!userHistory){
          return res.status(400).json({
              success:false,
              message:"No student found"
          })
      }
      const result = await Payment.aggregate([
        { $match: { studentId:new mongoose.Types.ObjectId(studentId) } },
        { $group: { _id: "$studentId", totalAmount: { $sum: "$amount" } } }
      ]);
      const receivedAmount = result.length > 0 ? result[0].totalAmount : 0;
      return res.status(200).json({success:true, message:"Get userHistory sucessfully",userHistory,receivedAmount}); 

  }catch(error){
      return res.status(500).json({
          status:0,
          message:error.message.toString(),
      })
  }
}

exports.totalamountPayment= async(req,res)=>{
  try{
     const pipeline = [
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' }
                }
            }
        ];

        const result = await Payment.aggregate(pipeline);

        if (result.length > 0) {
            res.json({ totalAmount: result[0].totalAmount });
        } else {
            res.json({ totalAmount: 0 });
        }
     

  }catch(error){
      return res.status(500).json({
          status:0,
          message:error.message.toString(),
      })
  }
}



exports.getAllPaymentStudentId = async(req,res)=>{
  try{
    const  {studentId}  = req.params;
    const payments = await Payment.find({ studentId: new mongoose.Types.ObjectId(studentId) });
    if (payments.length === 0) {
      return res.status(404).json({ success: false, message: 'No payments found for this student.' });
    }
   
      return res.status(200).json({success:true, message:"Get all payment history by StudentId sucessfully",payments}); 

  }catch(error){
      return res.status(500).json({
          status:0,
          message:error.message.toString(),
      })
  }

}