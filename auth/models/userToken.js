const mongoose = require("mongoose");
const userTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
    },
    status:{
        type:String
    },
    email:{
        type: String,
      },
},
  { timestamps: true }
);

module.exports = mongoose.model("userToken", userTokenSchema);
