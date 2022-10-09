const express = require('express');
const deleteRouter = express.Router();
const Messages = require('../models/messages.js');

deleteRouter.post('/:id', (req, res, next) => {
  Messages.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
    return res.redirect('/');
  });
});

module.exports = deleteRouter;
