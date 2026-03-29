const express = require('express');
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {registerUser, loginUser} = require("../controllers/authController")


router.get("/" , function(req,res) {
    res.send("hey its working");
})

router.post("/register" ,registerUser ); 
router.post("/login" , loginUser)

module.exports = router;