const express = require("express");
const router = express.Router();
const {addNewStudent,totalamountPaymentDue,getTotalStudent,getAllStudent,imageUpload,updateStudent} = require("../controllers/studentController");
const { upload } = require("../../middlewares/fileUpload");
const {verifyTokenAndAdmin} = require("../../middlewares/auth");
router.post('/addNewStudent', upload,addNewStudent);
router.get("/totalPaymentDue",verifyTokenAndAdmin,totalamountPaymentDue);
router.get("/getTotalStudent",verifyTokenAndAdmin,getTotalStudent);
router.get("/getAllStudent",verifyTokenAndAdmin,getAllStudent);
router.post("/imageUpload",upload,imageUpload);
router.put("/updateStudent/:id",upload,updateStudent);
module.exports = router;
