const express = require("express");
const router = express.Router();
const {studentPayment,getAllPaymentHistory,geOneUserPaymentHistory,totalamountPayment,getAllPayment,getAllPaymentStudentId} = require("../controllers/paymentController");
const {verifyTokenAndAdmin} = require("../../middlewares/auth");

router.post("/payment",studentPayment);
router.get("/getAllHistory",verifyTokenAndAdmin,getAllPaymentHistory);
router.get("/userHistory/:id",geOneUserPaymentHistory);
router.get("/totalAmount",totalamountPayment);
router.get("/getAllPayment",verifyTokenAndAdmin,getAllPayment);
router.get("/allPaymentStudentId/:id",verifyTokenAndAdmin,getAllPaymentStudentId);
module.exports = router;