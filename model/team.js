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
    password:{
        type:String,
        minLength:6,
        maxLength:20,
    }
})


const Team = mongoose.model("Team",TeamSchema);
module.exports =Team