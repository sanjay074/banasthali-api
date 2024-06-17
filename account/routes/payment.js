const express = require("express");
const router = express.Router();
const {studentPayment,getAllPaymentHistory} = require("../controllers/paymentController");
const {verifyTokenAndAdmin} = require("../../middlewares/auth");

router.post("/payment",verifyTokenAndAdmin,studentPayment);
router.get("/getAllHistory",verifyTokenAndAdmin,getAllPaymentHistory);


module.exports = router;