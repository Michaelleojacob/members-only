const express = require('express');
const signupRouter = express.Router();

signupRouter.get('/', (req, res, next) => {
  res.render('sign-up');
});

module.exports = signupRouter;
