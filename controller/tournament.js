const tournamentModel=require("../model/tournament");


async function getTournamets(req,res){
    try{
        const tournaments = await tournamentModel.find({});
        res.status(200).json(tournaments);
    }catch(err){
        res.status(422).json({"message":err.message});
    }
}

async function getTournametInfo(req,res){
    const {id}= req.params;
    try{
        const tournament = await tournamentModel.findById(id)
        .populate("gameAdmin")
        .populate("teams.type")
        .populate("players.type")
        .populate("winningTeam.type")
        .populate("winningUser.type");
        res.status(200).json(tournament);
    }catch(err){
        res.status(422).json({"message":err.message});
    }
}

module.exports = {
    getTournamets,
    getTournametInfo
}