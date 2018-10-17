require('./config/config');

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

require('./db/connect');
const { router: moviesRoutes } = require('./routes/movies');
const { router: landingPageRoute } = require('./routes/base');
const { router: apiRoutes } = require('./routes/api');
const apiCheck = require('./middleware/api-check');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(apiCheck);

app.use(express.static(path.join(__dirname, '/../dist/public')));

app.use('/', landingPageRoute);
app.use('/movies', moviesRoutes);
app.use('/api', apiRoutes);
app.get('*', (req, res) => {
  res.redirect('/');
});

app.use((error, req, res, next) => {
  res.status(500).send(`${ error }`);
});

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }.`);
  });
}

module.exports = { app };
