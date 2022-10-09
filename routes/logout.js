const express = require('express');
const logoutRouter = express.Router();

logoutRouter.get('/', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  return res.redirect(req.headers.referer);
});

module.exports = logoutRouter;
