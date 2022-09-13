const { User } = require("../models/User");

let auth = (req, res, next) => {
    //auth in here

    //get token from client cookie
    let token = req.cookies.x_auth;
    //decrypt token and find user
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    })
    //if user exist, auth clear

    //else auth fail
} 

module.exports = {auth};