const express = require("express");
const router = express.Router();
const tournamentController = require("../controller/tournament")

router.get("/tournaments",tournamentController.getTournaments);
router.get("/tournament/:id",tournamentController.getTournamentInfo);


module.exports =router;