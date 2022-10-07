const express = require('express');
const signinRouter = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

signinRouter.get('/', (req, res, next) => {
  res.render('sign-in');
});

signinRouter.post('/', async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    const checkpw = await bcrypt.compare(req.body.password, user.password);
  }
  res.redirect('/sign-in');
});

module.exports = signinRouter;
