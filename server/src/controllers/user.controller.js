const {STATUS_CODES, ALERTS} = require('../constants');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const bcrypt = require("bcryptjs");

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select(['-__v', '-password']);
        res.status(STATUS_CODES.OK).json({
            user,
            message: ALERTS.USER_CONTROLLER.FETCH_SUCCESS
        });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: ALERTS.UNKNOWN_ERROR
        });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const {name, email, username, password, address, mobile_number} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        await User.findByIdAndUpdate(req.params.id,
            {name, email, password: hashedPassword, username, address, mobile_number},
            {timestamps: {createdAt: false, updatedAt: true}});
        const updatedUser = await User.findById(req.params.id);
        res.status(STATUS_CODES.OK).json({
            user: updatedUser,
            message: ALERTS.USER_CONTROLLER.UPDATE_SUCCESS
        });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: ALERTS.UNKNOWN_ERROR
        });
    }
};

const updateUserBalance = async (req, res) => {
    try {
        const {amount, method} = req.body;
        const user = await User.findById(req.params.id);
        let newBalance = +user.balance;
        let message;
        if (method === 'WITHDRAW' && parseInt(amount) > newBalance) {
            res.status(STATUS_CODES.FORBIDDEN).json({
                message: ALERTS.WITHDRAW_FAILED
            });
        } else {
            if (method === 'WITHDRAW') {
                newBalance = newBalance - parseInt(amount);
                message = ALERTS.USER_CONTROLLER.BALANCE_WITHDRAWN_SUCCESS;
            } else if (method === 'TOPUP') {
                newBalance = newBalance + parseInt(amount);
                message = ALERTS.USER_CONTROLLER.BALANCE_TOPUP_SUCCESS;
            }
            await User.findByIdAndUpdate(req.params.id, {balance: newBalance},
                {timestamps: {createdAt: false, updatedAt: false}});
            const transaction = { userId: req.params.id, type: method, amount };
            const newTransaction = new Transaction(transaction);
            const savedTransaction = await newTransaction.save();
            const updatedUser = await User.findById(req.params.id);
            res.status(STATUS_CODES.OK).json({
                user: updatedUser,
                transaction: savedTransaction,
                message
            });
        }

    } catch (error) {
        console.error(error)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: ALERTS.UNKNOWN_ERROR
        });
    }
};

const getUserTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.params.id }).select(['-__v']);
        res.status(STATUS_CODES.OK).json({
            transactions,
            message: ALERTS.USER_CONTROLLER.TRANSACTION_SUCCESS
        });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: ALERTS.UNKNOWN_ERROR
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select(['-__v']);
        res.status(STATUS_CODES.OK).json({
            users,
            message: ALERTS.USER_CONTROLLER.FETCH_SUCCESS
        });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: ALERTS.UNKNOWN_ERROR
        });
    }
};

const transferBalance = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const fromUser = await User.findById(req.params.id);
        let fromUserBalance = fromUser.balance;
        let toUserBalance;
        if ( parseInt(amount) > fromUserBalance) {
            res.status(STATUS_CODES.FORBIDDEN).json({
                message: ALERTS.TRANSFER_FAILED
            });
        }else {
            const toUser = await User.findById(userId);
            fromUserBalance = fromUserBalance - amount;
            toUserBalance = toUser.balance + amount;
            const updatedFromUser = await User.findByIdAndUpdate(fromUser._id, {balance: fromUserBalance},
                {timestamps: {createdAt: false, updatedAt: false}});
            const updatedToUser = await User.findByIdAndUpdate(toUser._id, {balance: toUserBalance},
                {timestamps: {createdAt: false, updatedAt: false}});
            const fromUserTransaction = { userId: updatedFromUser._id, type: 'SENT', amount };
            const newFromUserTransaction = new Transaction(fromUserTransaction);
            const savedFormUserTransaction = await newFromUserTransaction.save()
            const toUserTransaction = { userId: updatedToUser._id, type: 'RECEIVED', amount };
            const newToUserTransaction = new Transaction(toUserTransaction);
            const savedToUserTransaction = await newToUserTransaction.save()
            res.status(STATUS_CODES.OK).json({
                users: [updatedFromUser, updatedToUser],
                transactions: [savedFormUserTransaction, savedToUserTransaction],
                message: ALERTS.USER_CONTROLLER.TRANSFER_SUCCESS
            });
        }
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: ALERTS.UNKNOWN_ERROR
        });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    updateUserBalance,
    getUserTransactions,
    getAllUsers,
    transferBalance
};
