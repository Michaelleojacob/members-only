const express = require('express');
const messageRouter = express.Router();
const { body, validationResult } = require('express-validator');
const { validateMessage } = require('../validators/message.js');
const Messages = require('../models/messages.js');

messageRouter.get('/', (req, res, next) => {
  // for testing, going to keep it /login
  // if (!currentUser) return res.redirect('/register');
  if (!currentUser) return res.redirect('/login');
  res.render('message-form', { user: currentUser });
});

messageRouter.post('/', validateMessage, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('message-form', {
      user: currentUser,
      title: req.body.title,
      message: req.body.message,
      errors: errors.array(),
    });
  }
  const newMessage = new Messages({
    author: currentUser.username,
    title: req.body.title,
    text: req.body.message,
    timeStamp: Date.now(),
  }).save((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = messageRouter;
