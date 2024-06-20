const express = require("express");
const router = express.Router();
const {verifyTokenAndAdmin}= require("../../middlewares/auth");
const {registrationUser,adminUserLogin,tokenstatus} = require("../controllers/adminController");

router.post("/adminSignup",registrationUser);
router.post("/adminLogin", adminUserLogin);
router.get("/tokenstatus",verifyTokenAndAdmin,tokenstatus);
module.exports = router;