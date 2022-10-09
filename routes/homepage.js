const express = require('express');
const homepageRouter = express.Router();

homepageRouter.get('/', (req, res, next) => {
  if (!req.user) {
    return res.redirect('/register');
  }
  return res.render('home', { user: req.user });
});

module.exports = homepageRouter;
