const mongoose = require("mongoose");
const paymentHistorySchema = new mongoose.Schema(
  {
    urlImgae:{
      type:String
     }
},
  { timestamps: true }
);

module.exports = mongoose.model("PaymentHistory", paymentHistorySchema);

