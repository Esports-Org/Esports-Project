const mongoose = require("mongoose");


const UserHistorySchema = new mongoose.Schema({
    participatedTournaments: {
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament"
        }],
        default:[]
    },
    createdTournaments: {
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament"
        }],
        default:[]
    },
    points: {
        type: Number,
        default:0
    }
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        requierd: true,
        minLength:6,
        maxLength:25,
    },
    email: {
        type: String,
        unique: true,
        requierd: true,
        minLength:6,
        validate: {
            validator: function(v) {
              return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
          }
    },
    hashedPassword: {
        type: String,
        requierd: true,
    },
    dateOfBirth: {
        type: Date
    },
    phoneNumber: {
        type: String,
        minLength:10,
        validate: {
            validator: function(v) {
              return /^[0-9]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          }
    },
    image: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
    },
    userHistory: {
        type: UserHistorySchema,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", UserSchema);