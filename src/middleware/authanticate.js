var jwt = require('jsonwebtoken');
require("dotenv").config();

const User = require("../models/user.model");
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SCERET_KEY, function (err, user) {
            console.log("err, user",err, user)
            if (err) return reject(err);

            return resolve(user);
        });
    })
        
}

module.exports = async (req, res, next) => {
    
    // check authorization header is present or not
    const bearerToken = req?.headers?.authorization;
    if (!bearerToken) return res.status(400).json({ status: "error", message: "you did not send the authorization header" });

    // check authrozition header har bearer token
    if (!bearerToken.startsWith("Bearer ")) {
        return res.status(400).json({ status: "error", message: "you did not send the authorization header" });
    }
    const token = bearerToken.split(" ")[1];
    try {
       let userId = await verifyToken(token);
       let user = await User.findOne({ _id: userId.id}).exec()
       req.user = user;
       return next();
    } catch(e) {
        return res.status(400).json({ status: "error", message: "you are not sending correct token" });
    }
}