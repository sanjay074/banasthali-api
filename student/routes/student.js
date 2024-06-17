const express = require("express");
const router = express.Router();
const {addNewStudent} = require("../controllers/studentController");
const {verifyTokenAndAdmin} = require("../../middlewares/auth");
router.post('/addNewStudent',verifyTokenAndAdmin, addNewStudent);


module.exports = router;
