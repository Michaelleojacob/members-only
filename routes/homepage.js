const express = require('express');
const homepageRouter = express.Router();

homepageRouter.get('/', (req, res, next) => {
  res.render('home', { title: 'members-only' });
});

module.exports = homepageRouter;
