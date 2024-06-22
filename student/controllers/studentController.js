const Student = require("../models/student");
const PaymentHistory = require("../models/paymentHistory");
const {studentJoiSchema} = require("../../validator/allValidator");
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
    const getAllStudent = await Student.find();
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

    return res.status(201).json({
      success: true,
      message: "Get all payment history successfully",
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