const mongoose = require('mongoose');
const { ALERTS } = require('../constants');
const { generateRandomAccountNumber} = require("../utils/helpers");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, ALERTS.USER_SCHEMA.NAME],
        },
        username: {
            type: String,
            required: [true, ALERTS.USER_SCHEMA.USER_NAME],
        },
        email: {
            type: String,
            required: [true, ALERTS.USER_SCHEMA.EMAIL],
        },
        password: {
            type: String,
            required: [true, ALERTS.USER_SCHEMA.PASSWORD],
        },
        address: {
            type: String,
            required: [true, ALERTS.USER_SCHEMA.ADDRESS],
        },
        mobile_number: {
            type: String,
            required: [true, ALERTS.USER_SCHEMA.MOBILE_NUMBER],
        },
        account_number: {
            type: String,
            default: generateRandomAccountNumber,
            unique: true,
        },
        balance: {
            type: Number,
            default: 0
        },
        is_oauth_user: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema, 'users');
