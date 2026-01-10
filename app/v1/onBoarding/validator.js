const { body, validationResult } = require('express-validator');

function validator(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    /**
     * validator for signup
     */
    signUp: [
        body('firstName')
            .trim()
            .notEmpty()
            .withMessage('first name is required.'),

        body('password')
            .trim()
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
            .matches(/[a-zA-Z0-9]/).withMessage("Password must contain upper case, lower case letter and a digit.")

            .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character"),

        body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match.');
                }
                return true;
            }),

        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required.')
            .custom((value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    throw new Error('Invalid email address.');
                }
                return true;
            }),
        validator
    ]



}