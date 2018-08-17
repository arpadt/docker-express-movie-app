require('./config/config');

const bodyParser = require('body-parser');
const express = require('express');

require('./db/connect');
const { router: moviesRoutes } = require('./routes/movies');
const { router: landingPageRoute } = require('./routes/base');

const app = express();

app.use(bodyParser.json());

app.use('/', landingPageRoute);
app.use('/movies', moviesRoutes);

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }.`);
  });
}

module.exports = { app };
