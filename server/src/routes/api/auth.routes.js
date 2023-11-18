const router = require('express').Router();
require('../../config/passport-setup');
const { signup: validateSignupRequest, login: validateLoginRequest, validate: validationErrors} = require("../../middleware/validation.middleware");
const { signup : authSignup, login: authLogin } = require("../../middleware/auth.middleware");
const { signup : signupController, login: loginController } = require("../../controllers/auth.contoller");

// router.get('/google', googleAuthentication);
//
// router.get('/google/redirect', passport.authenticate('oauth'), googleLogin);

// Signup Route
router.post(
    '/signup',
    validateSignupRequest,
    validationErrors,
    authSignup,
    signupController
);

// Login Route
router.post(
    '/login',
    validateLoginRequest,
    validationErrors,
    authLogin,
    loginController
);

module.exports = router;
