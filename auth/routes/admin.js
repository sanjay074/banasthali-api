const express = require("express");
const router = express.Router();
const {verifyTokenAndAdmin}= require("../../middlewares/auth");
const {registrationUser,adminUserLogin} = require("../controllers/adminController");

router.post("/adminSignup",registrationUser);
router.post("/adminLogin", adminUserLogin);
module.exports = router;