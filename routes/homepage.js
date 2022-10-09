const express = require('express');
const homepageRouter = express.Router();
const Messages = require('../models/messages.js');

const getHighestAuth = (user) => {
  let highestAuth = 'basic';
  if (user.roles.includes('member')) highestAuth = 'member';
  if (user.roles.includes('admin')) highestAuth = 'admin';
  return highestAuth;
};

homepageRouter.get('/', (req, res, next) => {
  // for testing, going to keep it /login
  // if (!currentUser) return res.redirect('/register');
  if (!currentUser) return res.redirect('/login');

  const auth = getHighestAuth(currentUser);

  // get all messages
  Messages.find({})
    .sort({ timeStamp: 'descending' })
    .exec((err, msgs) => {
      if (err) return next(err);
      return res.render('home', {
        user: currentUser,
        msg_list: msgs,
        auth: auth,
      });
    });
});

module.exports = homepageRouter;
