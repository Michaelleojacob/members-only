const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/users.js');
const mongoose = require('mongoose');
const { config } = require('dotenv');
config();

// connect to db
mongoose.connect(process.env.DB_URI, (err) => {
  if (err) {
    console.log(err);
  }
});

// app
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'stylesheets')));

// passport 'boilerplate'
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err, { message: err });
      }
      if (!user) {
        return done(null, false, { message: 'no user found' });
      }
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          return done(null, user);
        }
        return done(null, false, { message: 'incorrect user or password' });
      });
    });
  })
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// app wide global variables.
app.use(function (req, res, next) {
  global.currentUser = req.user;
  next();
});

// view 'boilerplate'
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// routes
const homepageRouter = require('./routes/homepage.js');
const registerRouter = require('./routes/register.js');
const loginRouter = require('./routes/login.js');
const messageRouter = require('./routes/message.js');
const deleteRouter = require('./routes/delete.js');
const logoutRouter = require('./routes/logout.js');

app.use('/', homepageRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/message', messageRouter);
app.use('/delete', deleteRouter);
app.use('/logout', logoutRouter);

// server
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(server.address().address);
  console.log(`server started at port: ${server.address().port}`);
});
