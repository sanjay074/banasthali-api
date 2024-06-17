const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
      firstName:{
            type:String
        },
      lastName:{
            type:String
        },
      rollNumber:{
            type:String
         },
      amount:{
          type:Number,
         },
      transactionId:{
           type:Number
         },
      phoneNumber:{
          type:String
        },
      transactionDate:{
          types:String
        },
      paymentType: {
              type: String,
              enum: ["cash", "online"],
              default: "cash",
            },
      status: {
              type: String,
              enum: ['pending', 'completed', 'decline'],
              default:"pending"
            },
},
  { timestamps: true }
);

module.exports = mongoose.model("payment", paymentSchema);

