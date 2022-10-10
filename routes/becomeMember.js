const express = require('express');
const becomeMemberRouter = express.Router();
const { body, validationResult } = require('express-validator');
const validateSecret = require('../validators/membership.js');
const User = require('../models/users.js');
const { config } = require('dotenv');
config();

becomeMemberRouter.get('/', (req, res, next) => {
  if (!currentUser) return res.redirect('/login');
  if (currentUser.roles.includes('member')) return res.redirect('/');
  if (currentUser.roles.includes('admin')) return res.redirect('/');
  return res.render('becomeMember', {
    user: currentUser,
  });
});

becomeMemberRouter.post('/', (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('becomeMember', { errors: errors.array() });
  }
  if (req.body.secret === process.env.passcode) {
    User.findByIdAndUpdate(
      { _id: currentUser._id },
      { $push: { roles: 'member' } }
    );
  }
  return res.redirect('/membership');
});

module.exports = becomeMemberRouter;
