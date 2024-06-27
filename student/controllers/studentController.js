const Student = require("../models/student");
const PaymentHistory = require("../models/paymentHistory");
const {studentJoiSchema} = require("../../validator/allValidator");
const mongoose = require("mongoose");
const cloudinary =require("../../cloudinary");
exports.addNewStudent = async (req,res)=>{
    try{
      const {error} = studentJoiSchema.validate(req.body);
      if(error){
          return res.status(400).json({message:error.details[0].message});
      }
      if (!req.file) {
        return res.status(400).json({
          status: 0,
          message: "Missing required parameter - file"
        });
      }
  
      const result = await cloudinary.uploader.upload_stream({
        resource_type: 'image'
      }, async (error, result) => {
        if (error) {
          return res.status(500).json({
            status: 0,
            message: error.message.toString(),
          });
        }
      
      const findStudentData = await Student.findOne({ 'studentDetails.studentId':req.body.studentDetails.studentId, });
      if(findStudentData){
        return res.status(400).json({success:false, message:"student id is already taken!"});
      }
      const findStudentroll = await Student.findOne({ 'studentDetails.rollNumber':req.body.studentDetails.rollNumber, });
      if(findStudentroll){
        return res.status(400).json({success:false, message:"student rollNumber is already taken!"});
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
        paymentDue:req.body.admissionFees,
        urlImgae:result.secure_url 
      })
      await student.save();
      return res.status(201).json({success:true, message:"New student  created  sucessfully"});
    }).end(req.file.buffer);
    }catch(error){
      return res.status(500).json({
          status:0,
          message:error.message.toString(),
      })
    }
  }

 
  
  exports.updateStudent = async (req, res) => {
    try {
      const studentId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ success: false, message: "Invalid student ID" });
      } 
      // const findStudentData = await Student.findOne({ 'studentDetails.studentId':req.body.studentDetails.studentId, });
      // if(findStudentData){
      //   return res.status(400).json({success:false, message:"student id is already taken!"});
      // }
      // const findStudentroll = await Student.findOne({ 'studentDetails.rollNumber':req.body.studentDetails.rollNumber, });
      // if(findStudentroll){
      //   return res.status(400).json({success:false, message:"student rollNumber is already taken!"});
      // }
       const updateData = req.body;
    
        if (req.file) {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }).end(req.file.buffer);
          });
    
          updateData.urlImgae = result.secure_url;
        }
      
        // Find student by ID and update
        const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, { new: true });
    
        if (!updatedStudent) {
          return res.status(404).json({ message: 'Student not found' });
        }
      

    res.json(updatedStudent);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
    }
  
  

 

  exports.totalamountPaymentDue= async(req,res)=>{
    try{
       const pipeline = [
              {
                  $group: {
                      _id: null,
                      totalPaymentDue: { $sum: '$paymentDue' }
                  }
              }
          ];
  
          const result = await Student.aggregate(pipeline);
  
          if (result.length > 0) {
              res.json({ totalPaymentDue: result[0].totalPaymentDue });
          } else {
              res.json({ totalPaymentDue: 0 });
          }
       
  
    }catch(error){
        return res.status(500).json({
            status:0,
            message:error.message.toString(),
        })
    }
  }

exports.getTotalStudent = async (req,res)=>{
  try{
   const total = await Student.find().countDocuments().lean();
   return res.status(201).json({success:true, message:"Get total student  sucessfully",total});
  }catch(error){
    return res.status(500).json({
      status:0,
      message:error.message.toString(),
  })
  }
}   

exports.getAllStudent= async (req, res) => {
  try {
    const getAllStudent = await Student.find().sort({ createdAt: -1 }) ;
    if (!getAllStudent) {
      return res.status(400).json({
        success: false,
        message: "No any getAllStudent",
      });
    }

    const formattedPaymentHistory = getAllStudent.map((payment) => {
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
      message: "Get all user list successfully",
      getAllStudent: formattedPaymentHistory,
    });
    

  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message.toString(),
    });
  }
};


exports.imageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 0,
        message: "Missing required parameter - file"
      });
    }

    const result = await cloudinary.uploader.upload_stream({
      resource_type: 'image'
    }, async (error, result) => {
      if (error) {
        return res.status(500).json({
          status: 0,
          message: error.message.toString(),
        });
      }

      const image = new PaymentHistory({ urlImgae: result.secure_url });
      await image.save();

      return res.status(201).json({
        success: true,
        message: "Image uploaded successfully",
        image
      });
    }).end(req.file.buffer);

  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message.toString(),
    });
  }
};