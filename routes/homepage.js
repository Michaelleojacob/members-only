const express = require('express');
const homepageRouter = express.Router();

homepageRouter.get('/', (req, res, next) => {
  // for testing, going to keep it /login
  // if (!currentUser) return res.redirect('/register');
  if (!currentUser) return res.redirect('/login');
  return res.render('home', { user: currentUser });
});

module.exports = homepageRouter;
