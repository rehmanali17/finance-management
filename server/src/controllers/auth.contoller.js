const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { STATUS_CODES, ALERTS } = require('../constants');
const User = require('../models/User')
require('dotenv').config();


const signup = async (req, res) => {
    try {
        const { name, email, username, password, address, mobile_number } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = { name, email, username, password: hashedPassword, address, mobile_number};
        const newUser = new User(user);
        const savedUser = await newUser.save()
        const token = jwt.sign({ id: savedUser._id }, process.env.jwtSecretKey, {
            expiresIn: "1h",
        });
        res.status(STATUS_CODES.OK).json({
            user: savedUser,
            accessToken: token,
            message: ALERTS.REGISTRATION.SUCCESS,
        });
    } catch (error) {
        console.log(error.message);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: ALERTS.REGISTRATION.FAILED,
        });
    }
};

const login = (req, res) => {
    try {
        const token = jwt.sign({ id: req.user._id }, process.env.jwtSecretKey, {
            expiresIn: "1h",
        });
        res.status(STATUS_CODES.OK).json({
            user: req.user,
            accessToken: token
        });
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message: ALERTS.UNKNOWN_ERROR
        });
    }
};

module.exports = { signup, login };
