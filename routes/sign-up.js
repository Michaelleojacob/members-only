const express = require('express');
const signupRouter = express.Router();
const { body, validationResult } = require('express-validator');
const { validateSignUp } = require('../validators/sign-up.js');

signupRouter.get('/', (req, res, next) => {
  res.render('sign-up');
});

signupRouter.post('/', validateSignUp, (req, res, next) => {
  const errors = validationResult(req);
  if (errors) {
    return res.render('sign-up', { errors: errors.array() });
  }
  res.redirect('/sign-up');
  // res.render('sign-in');
});

module.exports = signupRouter;
