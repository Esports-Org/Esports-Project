const mongoose = require("mongoose");

const TeamShcema = mongoose.Schema({
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