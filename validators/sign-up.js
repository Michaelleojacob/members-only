const { body, check, validationResult } = require('express-validator');
const User = require('../models/users');

exports.validateSignUp = [
  check('username')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Username can not be empty!')
    .bail()
    .isLength({ min: 1, max: 16 })
    .withMessage('Minimum 3 characters required!')
    .bail()
    .custom(async (username) => {
      const isNameTaken = await User.findOne({ username: username });
      if (isNameTaken) {
        throw new Error('username is taken');
      } else {
        return true;
      }
    })
    .withMessage('username already exists')
    .bail(),
  check('password')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Password can not be empty')
    .bail()
    .isLength({ min: 6, max: 16 })
    .withMessage('Password must be a minimum of 6 characters')
    .bail(),
  check('repassword')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('re entered password must not be empty')
    .bail()
    .custom(async (repassword, { req }) => {
      const doesMatch = await (repassword === req.body.password);
      if (doesMatch) {
        return true;
      } else {
        throw new Error('Password confirmation does not match password');
      }
    })
    .bail(),
  (req, res, next) => {
    next();
  },
];
