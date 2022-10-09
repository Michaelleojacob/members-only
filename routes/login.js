const express = require('express');
const loginRouter = express.Router();
const passport = require('passport');

loginRouter.get('/', (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }
  return res.render('login');
});

loginRouter.post(
  '/',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res, next) => {
    return res.render('login', { user: req.user });
  }
);

module.exports = loginRouter;
