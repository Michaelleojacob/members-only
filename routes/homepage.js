const express = require('express');
const homepageRouter = express.Router();

homepageRouter.get('/', (req, res, next) => {
  return res.render('register', { title: 'members-only' });
});

module.exports = homepageRouter;
