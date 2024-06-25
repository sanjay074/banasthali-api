const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/admin");
const UserToken = require("../models/userToken");
const {registrationAminUserSchema,adminUserLoginSchema} = require("../../validator/allValidator");

// 
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

   exports.adminUserLogin = async (req, res) => {
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
        const foundstatus = await UserToken.findOne({
          email: user.email,
          status: true,
        });
        if (foundstatus) {
          await UserToken.updateMany(
            { email: user.email, status: true },
            { status: false }
          );
        }
   
        const usertoken = new UserToken();
        usertoken.token = token;
        usertoken.status = true;
        usertoken.email = user.email;
        usertoken.save();
        res.status(200).json({success:true, message: "Admin user is login sucessfully", token });
      }
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.toString(),
          });
    }


  };  


  exports.tokenstatus = async (req, res) => {
    try {
      const authorization = req.headers?.authorization;
      const token = authorization.split(" ")[1];
      const isTokenExists = await UserToken.findOne({
        token: token,
      });
    
      if (isTokenExists?.status == null) {
        return res.status(401).json({
          status: 401,
          message:"User token not get"
        });
      }
  
      return res.status(200).json({
        data: isTokenExists?.status,
      });
    } catch (error) {
      return res.status(500).json({
        message: "something went wrong",
      });
    }
  };

  