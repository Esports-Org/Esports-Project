const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');

const secretKey = "this-key-must-be-changed-in-deployment-and-add-it-to-process-env";

const userModel = require("../model/user");
const tokenBlackListModel = require("../model/tokenBlackList");
const teamModel = require("../model/team");
const tournamentModel =require("../model/tournament")

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

        const token = jwt.sign(content, process.env.SECRET_KEY, { expiresIn: "3h" });
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

        const token = jwt.sign(content, process.env.SECRET_KEY, { expiresIn: "3h" });
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
    console.log("reached");
    const userID = req.user.userId;
    console.log("error");
    try{
        const user = await userModel.findById(userID);
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
}

userController.editUserProfile = async (req, res) => {
    const userId =req.user.userId;
    const updatedData=req.body;
    try{
        const updatedProfile = await userModel.findByIdAndUpdate(userId,updatedData,{new:true});
        res.status(200).json(updatedProfile);
    }
    catch(err){
        res.status(500).json(err);
    }
}

userController.deleteProfile = async (req, res) => {
    const userId = req.user.userId;
    try{
        await userModel.findByIdAndDelete(adminId);
        res.status(200).json({message:"account deleted successfully"});
    }
    catch(err){
        res.status(500).json(err);
    }
}

userController.userCreateTournament = async (req, res) => {
    const userId = req.user.userId;
    const tournamentData = req.body;
    tournamentData.gameAdmin = userId;
    try{
        const createdTournament = await tournamentModel.create(tournamentData)
        res.status(201).json({message:"tournament created",createdTournament})
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

userController.userEditTournament = async (req, res) => {
    const {id} = req.params;
    const updatedData = req.body;
    try{
        const updatedTournament = await tournamentModel.findByIdAndUpdate(id,updatedData,{new:true});
        res.status(200).json({updatedTournament})
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

userController.userDeleteTournament = async (req, res) => {
    const {id} = req.params;
    try{
        await tournamentModel.findByIdAndUpdate(id,{status:"canceled"});
        res.status(200).json({message:"tournament cancelled"})
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

userController.joinTeam = async (req, res) => {
    const  userId  = req.user.userId;
    const { teamId , password } = req.body;
    try{
        const team = await teamModel.findById(teamId);

        if(team.players.length === team.maxPlayers){
            return res.status(400).json({message: "the team is full"});
        }

        if(team.password && team.password !== password){
            return res.status(400).json({message: "incorrect password"});
        }

        if(team.players.includes(userId)){
            return res.status(400).json({message: "player already joined"});
        }

        team.players.push(userId);
        await team.save();
        res.status(200).json({message: "joined team successfully"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

userController.joinTournament = async (req, res) => {
    const { userId } = req.user;
    const { tournamentId } = req.body;
    try{
        const tournament = await tournamentModel.findById(tournamentId);

        if(tournament.players.length === tournament.numberOfPlayers){
            return res.status(400).json({message: "tournament is full"});
        }else if (tournament.players.includes(userId)){
            return res.status(400).json({message: "player already joined"});
        }

        tournament.players.push(userId);
        await tournament.save();
        res.status(200).json({message: "joined tournament successfully"});
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

userController.addTeam = async(req,res)=>{
    const  userId  = req.user.userId;
    const teamData = req.body;
    try{
        const createdTeam = await teamModel.create(teamData);
        const tournamentData = await tournamentModel.findById(teamData.tournamentId);
        tournamentData.teams.push(createdTeam._id);
        tournamentData.save();
        res.status(201).json({message:"team created"});
    }catch(err){
        res.status(422).json({message:err.message});
    }
}

userController.leaveTeam = async (req, res) => {
    const  userId  = req.user.userId;
    const { teamId } = req.body;
    try{
        const team = teamModel.findById(teamId);

        const index = team.players.indexOf(userId);
        if (index > -1) { // only splice array when item is found
            team.players.splice(index, 1); // 2nd parameter means remove one item only
        }

        await team.save();
        res.status(200).json({message: "leaved team successfully"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

userController.removeTeam = async (req, res) => {
    const { teamId } = req.body;
    try{
        await userModel.findByIdAndDelete(teamId);

        res.status(200).json({message: "team removed successfully"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

userController.withdrawFromTournament = async (req, res) => {
    const userId = req.user.userId;
    const { tournamentId } = req.body;
    try{
        const tournament = await tournamentModel.findById(tournamentId);

        const index = tournament.players.indexOf(userId);
        if (index > -1) { // only splice array when item is found
            tournament.players.splice(index, 1); // 2nd parameter means remove one item only
        }

        await tournament.save();
        res.status(200).json({message: "leaved tournament successfully"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = userController;