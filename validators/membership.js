const { body, check, validationResult } = require('express-validator');

const validateSecret = [
  check('secret')
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('incorrect, try again.')
    .bail(),
  (req, res, next) => next(),
];

module.exports = validateSecret;
