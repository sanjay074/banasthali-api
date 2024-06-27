const { types } = require("joi");
const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    studentDetails:{
        firstName:{
            type:String
        },
        lastName:{
            type:String
        },
          gender:{
              type:String
          },
          gender: {
              type: String,
              enum: ["Male", "Female"],
              default: "",
            },
            dob:{
              type:String,
            },
            email:{
              type:String,
            },
            mobileNumber:{
              type:String
            },
            address:{
              type:String
            },
            studentId:{
              type:String,
              
             },
             rollNumber:{
              type:String
           },
    },
     parentDetails:{
        firstName:{
            type:String
        },
        lastName:{
            type:String
        },
        mobileNumber:{
            type:String
          },
     },
     courseDetails:{
        courseName:{
            type:String,
        },
        session:{
            type:String,
        },
     },
    
     paymentDue:{
       type:Number,
       default:0
     },
     admissionFees:{
       type:Number,
       default:0
     },
     urlImgae:{
      type:String
     }
},
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
