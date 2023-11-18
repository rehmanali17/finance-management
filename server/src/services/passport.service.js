const { authenticateUser, authorizeUser, validateUser } = require('./auth.service');

const handleSignupStrategy = (email, password, done) => {
    authenticateUser(email, done)
}

const handleLoginStrategy = (email, password, done) => {
    authorizeUser(email, password, done)
}

const handleJWTStrategy = (token, done) => {
    validateUser(token, done);
};

module.exports = { handleSignupStrategy, handleLoginStrategy, handleJWTStrategy };
