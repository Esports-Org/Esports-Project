const tournamentModel=require("../model/tournament");


async function getTournaments(req,res){
    try{
        const tournaments = await tournamentModel.find({})
        .populate("teams.players")
        .populate("players");
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
        .populate("players.player")
        .populate("winningTeam")
        .populate("winningUser")
        .populate("teamMatches.team1")
        .populate("teamMatches.team2")
        .populate("playerMatches.player1")
        .populate("playerMatches.player2");
        res.status(200).json(tournament);
    }catch(err){
        res.status(422).json({"message":err.message});
    }
}

module.exports = {
    getTournaments,
    getTournamentInfo
}