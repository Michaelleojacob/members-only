const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { config } = require('dotenv');
config();

mongoose.connect(process.env.DB_URI, (err) => {
  if (err) {
    console.log(err);
  }
});

const app = express();

app.use(express.static(path.join(__dirname, 'stylesheets')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const homepageRouter = require('./routes/homepage.js');
const signupRouter = require('./routes/sign-up');
app.use('/', homepageRouter);
app.use('/sign-up', signupRouter);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(server.address().address);
  console.log(`server started at port: ${server.address().port}`);
});
