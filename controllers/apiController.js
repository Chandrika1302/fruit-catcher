const User = require('../models/User');
const jwt = require('jsonwebtoken')

exports.highscore_GET = function (req, res) {
    return res.json({ highscore: res.locals.highscore })
}

exports.highscore_POST = async function (req, res) {
    const highscore = req.body.highscore;

    const dbUser = await User.findOne({ username: res.locals.username });

    if (!dbUser) {
        res.sendStatus(404);

    }
    else {
        dbUser.highscore = highscore;
        await dbUser.save();
        res.sendStatus(200)
    }
}

exports.scores_POST = async function (req, res) {
    const score = req.body.score;

    const dbUser = await User.findOne({ username: res.locals.username });

    if (!dbUser) {
        res.sendStatus(404);

    }
    else {
        dbUser.scores.unshift(score);
        if(dbUser.scores.length>5) dbUser.scores.length=5;
        await dbUser.save();
        res.sendStatus(200)
    }
}