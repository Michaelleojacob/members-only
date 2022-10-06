const { body, check, validationResult } = require('express-validator');

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
    .custom((repassword, { req }) => {
      if (repassword === req.body.password) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage('passwords must match')
    .bail(),
  (req, res, next) => {
    next();
  },
];
