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
              enum: ["male", "female"],
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
     admissionFees:{
       type:Number,
       default:0
     }
},
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);