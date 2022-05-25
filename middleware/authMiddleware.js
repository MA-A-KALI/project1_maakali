const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.requireAuth = function(req, res, next) {
    const token = req.cookies.token

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                res.redirect('/consumer_login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/consumer_login')
    }
}

exports.checkHero = function(req, res, next) {
    const heroStatus = req.cookies.hero

    if(heroStatus === true) {
        next();
    } else {
        res.redirect('/');
    }
}