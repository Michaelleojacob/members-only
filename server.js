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

mongoose.connect(process.env.DB_URI, (err) => {
  if (err) {
    console.log(err);
  }
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'stylesheets')));
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, { message: 'Incorrect password' });
        }
      });
      return done(null, user);
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

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

const homepageRouter = require('./routes/homepage.js');
const registerRouter = require('./routes/register.js');
const loginRouter = require('./routes/login.js');

app.use('/', homepageRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(server.address().address);
  console.log(`server started at port: ${server.address().port}`);
});
