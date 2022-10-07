const express = require('express');
const signupRouter = express.Router();
const { body, validationResult } = require('express-validator');
const { validateSignUp } = require('../validators/sign-up.js');
const bcrypt = require('bcrypt');
const User = require('../models/users');

signupRouter.get('/', (req, res, next) => {
  res.render('sign-up');
});

signupRouter.post('/', validateSignUp, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('sign-up', {
      username: req.body.username,
      password: req.body.password,
      repassword: req.body.password,
      errors: errors.array(),
    });
  }
  await bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return err;
    }
    const user = new User({
      username: req.body.username,
      password: hash,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/sign-in');
    });
  });
});

module.exports = signupRouter;
