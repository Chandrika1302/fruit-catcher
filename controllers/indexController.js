const User = require('../models/User');
const path = require("path")
const jwt = require('jsonwebtoken')

exports.index = function (req, res, next) {
    res.render('index.ejs')
}

exports.login_GET = function (req, res, next) {
    res.render('login');
}

exports.login_POST = async function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const dbUser = await User.findOne({ username, password });
    if (!dbUser) {
        res.render('login', { errors: ['Username or Password incorrect'] })

    }
    else {
        const token = jwt.sign({ username }, process.env.TOKEN_KEY)
        res.cookie('token', token)
        res.redirect("/profile")
    }
}

exports.signup_GET = function (req, res, next) {
    res.render('signup');
}

exports.signup_POST = async function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const dbUser = await User.findOne({ username });
    if (dbUser) {
        res.render('signup', { errors: ['Username Already Exists'] })
    }
    else {
        const user = new User({ username, password, email });
        await user.save();
        const token = jwt.sign({ username }, process.env.TOKEN_KEY)
        res.cookie('token', token)
        res.redirect("/profile")
    }
}

exports.logout = function (req, res, next) {
    res.clearCookie('token')
    res.redirect("/");
}

exports.about = function (req, res, next) {
    res.render('about', { title: 'About' });
}

exports.game = function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/frontend/index.html'));
}

exports.profile = function (req, res, next) {
    res.render('profile', { title: res.locals.username + "'s Profile" });
}

exports.profileDelete_GET = function (req, res, next) {
    res.render('profileDelete', { title: "Delete " + res.locals.username + "'s Profile?" });
}


exports.profileDelete_POST = async function (req, res, next) {
    const dbUser = await User.findOne({ username: res.locals.username });
    if (dbUser) {
        await dbUser.remove();
        res.clearCookie('token')
        res.redirect("/");
    }
    else {
        res.render('login', { errors: ['Username or Password incorrect'] })
    }

}