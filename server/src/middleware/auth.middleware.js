const passport = require('passport');
const { STATUS_CODES, ALERTS, PASSPORT_STRATEGIES } = require('../constants');
require('../config/passport-setup');

// Signup Middleware
const signup = (req, res, next) => {
    passport.authenticate(PASSPORT_STRATEGIES.SIGNUP, (err, user) => {
        if (err || user) {
            res.status(STATUS_CODES.FORBIDDEN).json({
                message: ALERTS.EMAIL_ALREADY_EXISTS
            });
        } else {
            next();
        }
    })(req, res, next);
};

// Login Middleware
const login = (req, res, next) => {
    passport.authenticate(PASSPORT_STRATEGIES.LOGIN, (err, user, info) => {
        if (err || !user) {
            res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: info.message
            });
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};

// Validate Token Middleware || Route Protection Middleware
const jwtAuthentication = (req, res, next) => {
    passport.authenticate(PASSPORT_STRATEGIES.JWT, (err, user) => {
        if (err || !user) {
            res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: ALERTS.UNAUTHORIZED
            });
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};

module.exports = { signup, login, jwtAuthentication };
