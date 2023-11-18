const router = require('express').Router();
const { getUserProfile, updateUserProfile, updateUserBalance, getUserTransactions, transferBalance} = require('../../controllers/user.controller');
const { signup: validateProfileUpdateRequest, balance: validateBalanceRequest, transfer: transferBalanceRequest, validate: validationErrors} = require("../../middleware/validation.middleware");

// Fetch User Profile
router.get('/:id', getUserProfile);

// Update User
router.put('/:id',
    validateProfileUpdateRequest,
    validationErrors,
    updateUserProfile
);

// Update User Balance
router.patch('/balance/:id',
    validateBalanceRequest,
    validationErrors,
    updateUserBalance
);

// Get User Transactions
router.get('/transaction/:id',
    getUserTransactions
);

// Transfer Balance
router.patch('/transfer/:id',
    transferBalanceRequest,
    validationErrors,
    getUserTransactions,
    transferBalance
);

module.exports = router;
