const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Search Hacker News',
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Hacker news server started on port: ${server.address().port}`);
});
