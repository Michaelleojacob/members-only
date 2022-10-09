const express = require('express');
const messageRouter = express.Router();

messageRouter.get('/', (req, res, next) => {
  res.render('message-form', { user: req.user });
});

module.exports = messageRouter;
