const mongoose = require("mongoose");

const UserHistorySchema = new mongoose.Schema({
    participatedTournaments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament"
    }],
    createdTournaments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament"
    }],
    points: {
        type: Number
    }
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        requierd: true
    },
    email: {
        type: String,
        unique: true,
        requierd: true,
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
    }
});

module.exports = mongoose.model("User", UserSchema);