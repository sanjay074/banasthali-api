const mongoose = require("mongoose");
const adminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password:{
        type:String
    },
    isAdmin:{
        type: Boolean,
        default: true,
      },
},
  { timestamps: true }
);

module.exports = mongoose.model("AdminUser", adminUserSchema);
