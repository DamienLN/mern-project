const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model')

// test if user is connected
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        // verify token
        jwt.verify(token, proces.env.TOKEN_SECRET, async (err, decodedToken) => {
            // error 
            if (err) {
                res.locals.user = null;
                // delete the token in 1ms
                res.cookie('jwt', '', {maxAge: 1});
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id)
                res.locals.user = user;
                console.log(user);
                next();
            } 
        })
    } else {
        res.locals.user = null;
        next();
    }

}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // if we have a token 
    if (token) {
        jwt.verify(token,process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err){
                console.log(err);
            } else {
                console.log(decodedToken.id)
                next();
            }
        })
    }
    // if we dont have a token
    else {
        console.log('No token');
    }
}