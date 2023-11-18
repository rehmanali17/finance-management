const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { handleLoginStrategy, handleJWTStrategy, handleSignupStrategy} = require('../services/passport.service');
const {PASSPORT_STRATEGIES} = require("../constants");
require('dotenv').config();


passport.serializeUser((user, done) => {
    done(null, user);
});


// Signup Strategy
passport.use(
    PASSPORT_STRATEGIES.SIGNUP,
    new LocalStrategy({ usernameField: "email" },
        handleSignupStrategy
    )
);

// Login Strategy
passport.use(
    PASSPORT_STRATEGIES.LOGIN,
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        handleLoginStrategy
    )
);

// Route Protection Strategy
passport.use(
    PASSPORT_STRATEGIES.JWT,
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.jwtSecretKey,
        },
        handleJWTStrategy
    )
);
