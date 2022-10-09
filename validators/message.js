const { body, check, validationResult } = require('express-validator');

exports.validateMessage = [
  check('title')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('title can not be empty')
    .bail()
    .isLength({ min: 1, max: 30 })
    .withMessage('title must be between 1 and 30 letters')
    .bail(),
  check('message')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('message must not be empty')
    .bail()
    .isLength({ min: 1, max: 200 })
    .withMessage('message must be between 1 and 200 letters')
    .bail(),
  (req, res, next) => next(),
];
