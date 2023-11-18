const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
    {
        userId: mongoose.Types.ObjectId,
        amount: {
            type: Number,
        },
        type: {
            type: String,
            enum: ['WITHDRAW', 'TOPUP', 'SENT', 'RECEIVED']
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema, 'transactions');
