const mongoose = require("mongoose");
const validator = require("validator")
const TournamentSchema = new mongoose.Schema({
    gameAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    game:{
        type: String,
        enum:["League Of Legends","Dota 2","Street Fighters","Overwatch 2"],
        required:true
    },
    StartDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["upcoming","ongoing","finished","canceled"],
        required:true,
        default:"upcoming"
    },
    havePrize:{
        type:Boolean,
        required:true
    },
    prize:{
        type:Number,
        min:5,
    },
    isTeamMatch:{
        type:Boolean,
        required:true,
    },
    teamSize:{
        type:Number,
        min:3
    },
    numberOfTeams:{
        type:Number,
        min:2,
        validate: {
            validator: function(value) {
              return Math.log2(value) % 1 === 0;
            },
            message: props => `${props.value} is not a power of 2`
          },
        },
    numberOfPlayers:{
        type:Number,
        min:2,
        validate: {
            validator: function(value) {
              return Math.log2(value) % 1 === 0;
            },
            message: props => `${props.value} is not a power of 2`
          },
    },
    duration:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    teams:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team'
            }
        ],
        default:[]
    },
    remainingTeams:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team'
            }
        ],
        default:[]
    },
    players:{
        type:[
            {
                player: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                status: {
                    type: String,
                    enum: ["remaining", "lost"], // Add enum values as needed
                    default: "remaining"
                }
            }
        ],
        default:[]
    },
    teamMatches:{
        type:[{
        team1: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        },
        team2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }

    }],
    defualt:[]
},
    playerMatches:{
        type:[{
            player1: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }, 
            player2: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
    }],
    default:[]},
    winningTeam:{
        type:{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        },
        default:{}
    },
    winningUser:{
        type:{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        default:{}
    }
})

const Tournament = mongoose.model("Tournament",TournamentSchema);
module.exports =Tournament