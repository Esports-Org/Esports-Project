const tournamentModel=require("../model/tournament");


async function getTournaments(req,res){
    try{
        const tournaments = await tournamentModel.find({});
        res.status(200).json(tournaments);
    }catch(err){
        res.status(422).json({"message":err.message});
    }
}

async function getTournamentInfo(req,res){
    const {id}= req.params;
    try{
        const tournament = await tournamentModel.findById(id)
        .populate("gameAdmin")
        .populate("teams")
        .populate("players")
        .populate("winningTeam")
        .populate("winningUser");
        res.status(200).json(tournament);
    }catch(err){
        res.status(422).json({"message":err.message});
    }
}

module.exports = {
    getTournaments,
    getTournamentInfo
}