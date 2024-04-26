const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');

const secretKey = "this-key-must-be-changed-in-deployment-and-add-it-to-process-env";

const userModel = require("../model/user");
const tokenBlackListModel = require("../model/tokenBlackList");


const userController = {};

/*****************************validate password*************/
const validateCriteria = new passwordValidator();
validateCriteria
.is().min(8)
.is().max(70)
.has().uppercase()
.has().lowercase()
.has().digits(2)
.has().not().spaces()
/************************************************************/

userController.userSignup = async (req, res) => {
    try{
        const { username, email, password1, password2, dateOfBirth, phoneNumber, image, isAdmin } = req.body;

        const existingUser = await userModel.findOne({ email: email });
        if(existingUser){
            return res.status(400).json({message: "email already exists"});
        }
        else if( password1 !== password2 ){
            return res.status(400).json({message: "passwords do not match"})
        }
        else if( !(validateCriteria.validate(password1)) ){
            return res.status(400).json({message: "Password does not meet criteria,\n minimum 8 letters or numbers \n must have uppercase and at least 2 numbers"});
        }

        const hashedPassword = await bcrypt.hash(password1, 10);

        await userModel.create({
            username,
            email,
            hashedPassword,
            dateOfBirth,
            phoneNumber,
            image,
            isAdmin,
        });

        const user = await userModel.findOne({email: email});

        const content = {
            userId: user._id,
            authorized:user.isAdmin,
        }

        const token = jwt.sign(content, secretKey, { expiresIn: "3h" });
        res.status(200).json(token);
    }
    catch(err){
        res.status(500).json(err);
    }
}

userController.userLogin = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await userModel.findOne({email: email});
        if(!user) {
            return res.status(400).json({message: "user does not exist, signup instead"});
        }

        const hashedPassword = await bcrypt.compare(password, user.hashedPassword);

        if(!hashedPassword){
            return res.status(400).json({message: "wrong user name or password"})
        }

        const content = {
            userId: user._id,
            authorized:user.isAdmin,
        }

        const token = jwt.sign(content, secretKey, { expiresIn: "3h" });
        res.status(200).json(token);
    }
    catch(err){
        res.status(500).json(err);
    }
}

userController.userLogout = async (req, res) => {
    try{
        const token = req.headers.authorization;

        await tokenBlackListModel.create({ token });
        res.status(200).json({ message: "signed out sucessfully" });
    }
    catch(err){
        res.status(500).json(err);
    }
}

userController.getUserProfile = async (req, res) => {
    try{
        
    }
    catch(err){
        res.status(500).json(err);
    }
}