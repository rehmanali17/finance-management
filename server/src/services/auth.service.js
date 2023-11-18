const User = require('../models/User');
const { ALERTS } = require('../constants');
const bcrypt = require("bcryptjs");


// Local Authentication Service
const authenticateUser = async (email, done) => {
    User.findOne({ email })
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => done(err));
};

// Local Authorization Service
const authorizeUser = async (email, password, done) => {
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return done(null, false, {
                    message: ALERTS.NO_USER
                });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, {
                    message: ALERTS.INCORRECT_PASSWORD,
                });
            }
            return done(null, user);
        })
        .catch((err) => done(err, false, { message: ALERTS.UNKNOWN_ERROR }));
};



// Jwt Validation Service
const validateUser = async ({ id }, done) => {
    try {
        const user = await User.findById(id).select('-__v');
        if (user === null) {
            done(null, false, {
                message: ALERTS.NO_USER
            });
        } else {
            done(null, user);
        }
    } catch (error) {
        done(error, false, {
            message: ALERTS.UNKNOWN_ERROR,
            error: error.message,
        });
    }
};

module.exports = { authenticateUser, authorizeUser, validateUser };
