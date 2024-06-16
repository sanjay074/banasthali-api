const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/admin");
const {registrationAminUserSchema,adminUserLoginSchema} = require("../../validator/allValidator");


exports.registrationUser = async (req, res) => {
    try{
     const {email,password} = req.body;
     const { error } = registrationAminUserSchema.validate(req.body);
     if(error){
        return res.status(400).send(error.details[0].message);
         
     }
     const exist = await AdminUser.exists({ email: req.body.email });
     if (exist) {
       return res.status(400).json({success:false, message:"This email is already taken!"});
     }
     const hashedPassword = await bcrypt.hash(password, 10);
     const newUser = new AdminUser({
         email,
         password:hashedPassword
     })
     const saveUserData = await newUser.save();
     res.status(200).json({success:true, message:"Admin user registration is sucessfully"});
 
    }catch(error){
 
     return res.status(500).json({
         status: 0,
         message: error.toString(),
       });
    }
     
   }

   exports.asminUserLogin = async (req, res) => {
    try {
      const {error}= adminUserLoginSchema.validate(req.body);
      if(error){
        return res.status(400).json(error.details[0].message)
      }
     const user = await AdminUser.findOne({email: req.body.email})
      if (!user) {
        return res.status(400).json({success:false, message: 'Invalid credentials'});
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(400).json({success:false, message: 'Invalid credentials'});
      } else {
        const token = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SER,
          { expiresIn: "30d" }
        );
        res.status(200).json({success:true, message: "Admin user is login sucessfully", token });
      }
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.toString(),
          });
    }


  };  