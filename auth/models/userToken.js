const mongoose = require("mongoose");
const userTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
    },
    status:{
        type:String
    },
    userID:{
        type: String,
      },
},
  { timestamps: true }
);

module.exports = mongoose.model("userToken", userTokenSchema);
