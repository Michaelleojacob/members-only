const express = require('express');
const becomeMemberRouter = express.Router();
const { body, validationResult } = require('express-validator');

becomeMemberRouter.get('/', (req, res, next) => {
  // if (!currentUser) return res.redirect('/login');
  res.render('becomeMember', {
    user: currentUser,
  });
});

becomeMemberRouter.post('/', (req, res, next) => {
  console.log(req.body);
  res.redirect('/membership');
});

module.exports = becomeMemberRouter;
