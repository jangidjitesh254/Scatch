const express = require('express');
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function(req ,res) {
    try {
        let {email , password , fullname} = req.body;

        let createdUser = await userModel.findOne({email : email})
        if(createdUser) return res.status(502).send("user already exist , please login");

        bcrypt.genSalt(10 ,function(err ,salt) {
            bcrypt.hash(password ,salt ,async function(err ,hash){
                if(err) return res.send(err.message);
                else {
                    let createdUser = await userModel.create({
                        email,
                        password : hash,
                        fullname
                    });
                    let token = generateToken(createdUser);
                    res.cookie("token" , token);
                    res.send("user created successfully");
                }
            });
        })

    
    } catch (err) {
        console.log(err.message);
    }
}

module.exports.loginUser = async function(req ,res){
    let {email , password} = req.body;

    let user = await userModel.findOne({email : email})
    if(!user) return res.send("Email or password incorrect");

    bcrypt.compare(password , user.password , function(err ,result){
        if(result){
            let token = generateToken(user);
            res.cookie("token" , token);
            res.send("you can login");
        }else{
            res.send("Email or password incorrect");
        }
    })
}
