const express = require("express");
const router = express.Router();
const {studentPayment,getAllPaymentHistory,geOneUserPaymentHistory,totalamountPayment,getAllPayment,getAllPaymentStudentId} = require("../controllers/paymentController");
const {verifyTokenAndAdmin} = require("../../middlewares/auth");

router.post("/payment",verifyTokenAndAdmin,studentPayment);
router.get("/getAllHistory",verifyTokenAndAdmin,getAllPaymentHistory);
router.get("/userHistory/:id",verifyTokenAndAdmin,geOneUserPaymentHistory);
router.get("/totalAmount",verifyTokenAndAdmin,totalamountPayment);
router.get("/getAllPayment",verifyTokenAndAdmin,getAllPayment);
router.get("/allPaymentStudentId/:studentId",verifyTokenAndAdmin,getAllPaymentStudentId);
module.exports = router;