require('./config/config');

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

require('./db/connect');
const { router: moviesRoutes } = require('./routes/movies');
const { router: landingPageRoute } = require('./routes/base');
const { router: apiRoutes } = require('./routes/api');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../dist/public')));

app.use('/', landingPageRoute);
app.use('/movies', moviesRoutes);
app.use('/api', apiRoutes);
app.get('/home', (req, res) => {
  res.redirect('/');
});

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }.`);
  });
}

module.exports = { app };
