const express = require("express");
const router = express.Router();
const {studentPayment,getAllPaymentHistory,geOneUserPaymentHistory,totalamountPayment,getAllPayment} = require("../controllers/paymentController");
const {verifyTokenAndAdmin} = require("../../middlewares/auth");

router.post("/payment",studentPayment);
router.get("/getAllHistory",verifyTokenAndAdmin,getAllPaymentHistory);
router.get("/userHistory/:id",geOneUserPaymentHistory);
router.get("/totalAmount",totalamountPayment);
router.get("/getAllPayment",verifyTokenAndAdmin,getAllPayment);
module.exports = router;