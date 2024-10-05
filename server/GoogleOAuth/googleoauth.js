const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;
const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  redirect_uri:process.env.REDIRECT_URL,
  passReqToCallback: true
},
  async (request, accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = new User({
        username: profile.displayName,
        email: profile.emails[0].value
      });
      await user.save();
    }
    const data1 = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data1, JWT_SECRET, { expiresIn: '7 days' })

    return done(null, { authToken, profile });
  }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
