const express = require("express");
const router = express.Router();
const {verifyTokenAndAdmin}= require("../../middlewares/auth");
const {registrationUser,asminUserLogin} = require("../controllers/adminController");

router.post("/adminSignup",registrationUser);
router.post("/adminLogin", asminUserLogin);
module.exports = router;