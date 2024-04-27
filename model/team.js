const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
    tournamentId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tournament'
    },
    name:String,
    players:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        default:[]
    },
    maxPlayers: {
        type: Number,
        default: 5,
        min: 2,
    },
    password:{
        type:String,
        minLength:6,
        maxLength:20,
        default: "",
    }
})


const Team = mongoose.model("Team",TeamSchema);
module.exports =Team