
const { body, validationResult } = require('express-validator');

exports.validateContact = [
    body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('message').trim().isLength({ min: 1 }).withMessage('Message is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
