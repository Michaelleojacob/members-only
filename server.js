const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const homepageRouter = require('./routes/homepage.js');
app.use('/', homepageRouter);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(server.address().address);
  console.log(`server started at port: ${server.address().port}`);
});
