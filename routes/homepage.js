const express = require('express');
const homepageRouter = express.Router();

homepageRouter.get('/', (req, res, next) => {
  return res.redirect('/register');
});

module.exports = homepageRouter;
