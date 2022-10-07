const express = require('express');
const loginRouter = express.Router();
const passport = require('passport');

loginRouter.get('/', (req, res, next) => {
  return res.render('login');
});

loginRouter.post('/', (req, res, next) => {
  console.log(req);
  next();
  res.redirect('/login');
});

module.exports = loginRouter;
