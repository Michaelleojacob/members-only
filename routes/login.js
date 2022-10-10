const express = require('express');
const loginRouter = express.Router();
const passport = require('passport');

loginRouter.get('/', (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }
  return res.render('login');
});

// loginRouter.post(
//   '/',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureMessage: true,
//   })
// );
loginRouter.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failWithError: true,
  }),
  (err, req, res, next) => {
    return res.render('login', { error: 'incorrect username or password' });
  }
);

module.exports = loginRouter;
