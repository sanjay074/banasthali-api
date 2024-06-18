const express = require("express");
const router = express.Router();
const {addNewStudent} = require("../controllers/studentController");
const {verifyTokenAndAdmin} = require("../../middlewares/auth");
router.post('/addNewStudent', addNewStudent);


module.exports = router;
