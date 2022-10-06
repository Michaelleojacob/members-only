const express = require('express');
const signupRouter = express.Router();

signupRouter.get('/', (req, res, next) => {
  res.render('sign-up');
});

signupRouter.post('/', (req, res, next) => {
  console.log(req.body);
  res.redirect('/sign-up');
  // res.render('sign-in');
});

module.exports = signupRouter;
