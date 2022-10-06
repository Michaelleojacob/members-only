const express = require('express');
const signupRouter = express.Router();
const { body, validationResult } = require('express-validator');
const { validateSignUp } = require('../validators/sign-up.js');

signupRouter.get('/', (req, res, next) => {
  res.render('sign-up');
});

signupRouter.post('/', validateSignUp, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('sign-up', {
      username: req.body.username,
      password: req.body.password,
      repassword: req.body.password,
      errors: errors.array(),
    });
  }
  res.redirect('/sign-up');
});

module.exports = signupRouter;
