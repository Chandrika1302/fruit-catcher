const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, maxLength: 20 },
    password: { type: String, maxLength: 25 },
    email: { type: String, maxLength: 50 },
    highscore: { type: Number, maxLength: 50, default: 0 },
    scores: {
        type: [Number],
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;