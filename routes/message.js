const express = require('express');
const messageRouter = express.Router();

messageRouter.get('/', (req, res, next) => {
  if (!currentUser) return res.redirect('/register');
  res.render('message-form', { user: req.user });
});

module.exports = messageRouter;
