const express = require('express');
const loginRouter = express.Router();
const passport = require('passport');

loginRouter.get('/', (req, res, next) => {
  return res.render('login');
});

loginRouter.post(
  '/',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res, next) => {
    // console.log(req.user);
    return res.render('login', { user: req.user });
  }
);

module.exports = loginRouter;
