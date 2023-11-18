const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    PROCESS_EXIT: 1,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const ALERTS = {
    SERVER_RUNNING: (port) => `Server is running at port:${port}`,
    DATABASE_CONNECTED: 'Database connected',
    USER_SCHEMA: {
        EMAIL: 'Email is required',
        VALID_EMAIL: 'Please enter a valid email',
        NAME: 'Name is required',
        VALID_NAME: 'Please enter a valid name',
        USER_NAME: 'Username is required',
        PASSWORD: 'Password is required',
        PASSWORD_LENGTH: 'Password should be atleast six characters',
        ADDRESS: 'Address is required',
        MOBILE_NUMBER: 'Mobile Number is required',
    },
    BALANCE: {
        AMOUNT: 'Amount is required',
        VALID_AMOUNT: 'Please enter a valid amount',
        METHOD: 'Transaction method is required',
        VALID_METHOD: 'Please choose a valid Transaction method',
        USER_ID: 'Recipient Id is required'
    },
    REGISTRATION: {
        FAILED: 'Registration failed',
        SUCCESS: 'User registered successfully'
    },
    USER_CONTROLLER: {
        FETCH_SUCCESS: 'User fetched successfully',
        TRANSACTION_SUCCESS: 'User transactions fetched successfully',
        UPDATE_SUCCESS: 'Profile updated successfully',
        BALANCE_WITHDRAWN_SUCCESS: 'Balance withdrawn successfully',
        BALANCE_TOPUP_SUCCESS: 'Balance topup successfully',
    },
    WITHDRAW_FAILED: 'Withdraw balance cannot be greater than actual balance',
    TRANSFER_FAILED: 'Transfer balance cannot be greater than actual balance',
    TRANSFER_SUCCESS: 'Balance transferred successfully',
    UNAUTHORIZED: 'User is not authorized',
    UNKNOWN_ERROR: 'An unknown error occurred',
    NO_USER: 'User does not exist',
    EMAIL_ALREADY_EXISTS: 'This email already exists',
    INCORRECT_PASSWORD: 'Incorrect password entered for the user',
};

const PASSPORT_STRATEGIES = {
    SIGNUP: 'signup',
    LOGIN: 'login',
    JWT: 'jwt'
}

module.exports = { STATUS_CODES, ALERTS, PASSPORT_STRATEGIES };
