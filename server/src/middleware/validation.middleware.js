const { check, validationResult } = require("express-validator");
const {ALERTS} = require("../constants");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        const extractedErrors = [];
        errors
            .array({ onlyFirstError: true })
            .forEach((error) =>
                extractedErrors.push({ [error.path]: error.msg })
            );
        res.status(400).json({ errors: extractedErrors });
    }
};

const signup = [
    check("email")
        .notEmpty()
        .withMessage({ required: ALERTS.USER_SCHEMA.EMAIL })
        .isEmail()
        .withMessage({ valid: ALERTS.USER_SCHEMA.VALID_EMAIL }),
    check("name")
        .notEmpty()
        .withMessage({ required: ALERTS.USER_SCHEMA.NAME })
        .custom((value) => {
            return /^[a-zA-Z ]+$/.test(value);
        })
        .withMessage({ valid: ALERTS.USER_SCHEMA.VALID_NAME }),
    check("password")
        .notEmpty()
        .withMessage({ required: ALERTS.USER_SCHEMA.PASSWORD })
        .isLength({ min: 6 })
        .withMessage({
            valid: ALERTS.USER_SCHEMA.PASSWORD_LENGTH,
        }),
    check("username")
        .notEmpty()
        .withMessage({ required: ALERTS.USER_SCHEMA.USER_NAME }),
    check("address")
        .notEmpty()
        .withMessage({ required: ALERTS.USER_SCHEMA.ADDRESS }),
    check("mobile_number")
        .notEmpty()
        .withMessage({ required: ALERTS.USER_SCHEMA.MOBILE_NUMBER }),
];

const login = [
    check("email")
        .notEmpty()
        .withMessage({ required: ALERTS.USER_SCHEMA.EMAIL })
        .isEmail()
        .withMessage({ valid: ALERTS.USER_SCHEMA.VALID_EMAIL }),
    check("password")
        .notEmpty()
        .withMessage({ required: ALERTS.USER_SCHEMA.PASSWORD }),
];

const balance = [
    check("amount")
        .notEmpty()
        .withMessage({ required: ALERTS.BALANCE.AMOUNT })
        .isNumeric()
        .withMessage({ valid: ALERTS.BALANCE.VALID_AMOUNT }),
    check("method")
        .notEmpty()
        .withMessage({ required: ALERTS.BALANCE.METHOD })
        .isIn(['WITHDRAW', 'TOPUP'])
        .withMessage({ valid: ALERTS.BALANCE.VALID_METHOD })
];

const transfer = [
    check("amount")
        .notEmpty()
        .withMessage({ required: ALERTS.BALANCE.AMOUNT })
        .isNumeric()
        .withMessage({ valid: ALERTS.BALANCE.VALID_AMOUNT }),
    check("userId")
        .notEmpty()
        .withMessage({ required: ALERTS.BALANCE.USER_ID })
];

module.exports = { signup, login, validate, balance, transfer };
