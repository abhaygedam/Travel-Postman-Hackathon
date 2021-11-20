var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require("dotenv").config();
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const { newToken } = require("../controllers/user.controller");
const User = require("../models/user.model");


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback   : true
  },
  async function (request, accessToken, refreshToken, profile, done) {
    console.log("email", profile);
    try {
      let user = await User.findOne({ email: profile?._json?.email}).lean().exec();
      if (!user) {
        user = await User.create({email: profile?._json?.email, password: uuidv4(), blogName: profile?._json?.given_name+"blog"})
      }
      const token = newToken(user);
       return done(null, {user, token}); 
    }
    catch (err) {
        return done(null, err); 
    }
  }
));

module.exports = passport;

