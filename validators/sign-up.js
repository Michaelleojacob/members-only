const { body, check, validationResult } = require('express-validator');

exports.validateSignUp = [
  check('username')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Username can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  (req, res, next) => {
    next();
  },
];
