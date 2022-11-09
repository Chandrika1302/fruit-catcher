const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = function authenticate(req, res, next) {
    const token = req.cookies["token"];
    const url = req.url;
    const uncheckedRoutes = ['/login', '/logout', '/signup', '/', '/about'];

    if (!token) {
        if (uncheckedRoutes.includes(url)) {
            return next();
        }
        return res.redirect("/login")
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
        if (err) {
            next(err)
        }
        else {
            const cookieUser = data.username;
            User.findOne({ username: cookieUser }, (err, dbUser) => {
                if (err) next(err);
                if (dbUser) {
                    res.locals.username = dbUser.username;
                    res.locals.email = dbUser.email;
                    res.locals.highscore = dbUser.highscore;
                    res.locals.scores = dbUser.scores;
                    next();
                }
                else {
                    res.redirect("/login")
                }
            });

        }
    })
}