const express = require('express');
const registerRouter = express.Router();
const { body, validationResult } = require('express-validator');
const { validateSignUp } = require('../validators/sign-up.js');
const bcrypt = require('bcrypt');
const User = require('../models/users');

registerRouter.get('/', (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('register');
});

registerRouter.post('/', validateSignUp, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('register', {
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
      roles: ['basic'],
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/login');
    });
  });
});

module.exports = registerRouter;
