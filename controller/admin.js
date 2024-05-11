const userModel = require("../model/user")
const tournamentModel = require("../model/tournament")
const tokenBlackListModel = require("../model/tokenBlackList");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


async function getUsers(req,res){
    try{
        const users =await userModel.find({isAdmin:false});
        res.status(200).json(users);
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

async function getAdmins(req,res){
    try{
        const admins =await userModel.find({isAdmin:true});
        res.status(200).json(admins);
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

async function getUserInfo(req,res){
    const {id} = req.params;
    try{
        const user =await userModel.findById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

async function banUser(req,res){
    const {id} = req.params;
    try{
        await userModel.findByIdAndUpdate(id,
            {isBanned:true});
        res.status(200).json({message:"User banned successfully"});
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

async function deleteUser(req,res){
    const {id} = req.params;
    try{
        await userModel.findByIdAndDelete(id);
        res.status(200).json({message:"account deleted successfully"});
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

async function createUser(req,res){
    const { password, password2 } = req.body;
    try {
        //make good validation on front end plz
      if (password !== password2) throw new Error("passwords doesn't match");

      const hashedPassword = await bcrypt.hash(password, 10);
      
      //remove the password confirmation from the request body
      delete req.body.password2;

      //replace the password with hashed password
      req.body.hashedPassword = hashedPassword;
      await userModel.create(req.body);
      res.status(201).json({ message: "user created successfully" });
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
}

async function login(req,res){
    const {email, password} = req.body;
    try{
        const user =await userModel.find({email:email},{});
        const isPasswordMatching = await bcrypt.compare(password,user.hashedPassword);
        if(isPasswordMatching)
            {
                const token = jwt.sign({ userId: user._id, authorized:user.isAdmin }, process.env.SECRET_KEY, {
                    expiresIn: "3h",
                  });
                  res.status(200).json(token);
            }else{
                res.status(401).json({message:"wrong user name or password"})
            }
    }catch(err){
        res.status(422).json({message:"user not found"})
    }
}

async function logout(req, res) {
    const token = req.headers.authorization;
    try {
      await tokenBlackListModel.create({ token });
      res.status(200).json({ message: "signed out sucessfully" });
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
}

async function getProfile(req,res){
    const adminId = req.user.userId;
    try{
        const adminData = await userModel.findById(adminId);
        res.status(200).json(adminData);
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

async function editProfile(req,res){
    const {userId} =req.user;
    const updatedData=req.body
    try{
        const updatedProfile =await userModel.findByIdAndUpdate(userId,updatedData,{new:true});
        res.status(200).json(updatedProfile);
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

async function deleteProfile(req,res){
    const adminId = req.user.userId;
    try{
        await userModel.findByIdAndDelete(adminId);
        res.status(200).json({message:"account deleted successfully"});
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

async function createTournament(req,res){
    const tournamentData=req.body;
    try{
        const createdTournament = await tournamentModel.create(tournamentData)
        res.status(201).json({message:"tournament created",createdTournament})
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

async function editTournament(req,res){
    const {id}= req.params;
    const updatedData= req.body;
    try{
        const updatedTournament = await tournamentModel.findByIdAndUpdate(id,updatedData,{new:true});
        res.status(200).json({updatedTournament})
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

async function cancelTournament(req,res){
    const {id}= req.params;
    try{
        await tournamentModel.findByIdAndUpdate(id,{status:"canceled"});
        res.status(200).json({message:"tournament cancelled"})
    }catch(err){
        res.status(422).json({message:err.message})
    }
}

async function removeTeam(req,res){
    const {id} = req.params;
    const tournamentId = req.body;
    try{
        const tournamentData= await tournamentModel.findById(tournamentId);
        const teams=tournamentData.teams;
        const teamIndex=teams.findIndex((team)=>team._id.toString()===id.toString())
        tournamentData.teams.splice(teamIndex,1);
        tournamentData.save();
        res.status(200).json({message:"team deleted",tournamentData});
    }catch(err){
        res.status(422).json({message:err.message});
    }
}

module.exports={
    getUsers,
    getAdmins,
    getUserInfo,
    banUser,
    deleteUser,
    createUser,
    login,
    logout,
    getProfile,
    editProfile,
    deleteProfile,
    createTournament,
    editTournament,
    cancelTournament,
    removeTeam
}