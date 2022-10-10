const express = require('express');
const messageRouter = express.Router();
const { body, validationResult } = require('express-validator');
const Messages = require('../models/messages.js');

messageRouter.get('/', (req, res, next) => {
  // for testing, going to keep it /login
  // if (!currentUser) return res.redirect('/register');
  if (!currentUser) return res.redirect('/login');
  res.render('message-form', { user: currentUser });
});

messageRouter.post('/', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = messageRouter;
