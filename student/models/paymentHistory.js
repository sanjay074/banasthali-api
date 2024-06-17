const mongoose = require("mongoose");
const paymentHistorySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
      totalAmount:{
          type:Number,
         },
       paymentDue:{
         type:Number
       }, 
       paymentReceived:{
        types:Number
       }, 
      status: {
              type: String,
              enum: ['pending', 'completed', 'decline'],
              default:"completed"
            },
},
  { timestamps: true }
);

module.exports = mongoose.model("PaymentHistory", paymentHistorySchema);

