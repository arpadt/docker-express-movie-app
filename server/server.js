require('./config/config');

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const errorHandler = require('errorhandler');

require('./db/connect');
const routes = require('./routes');
const apiCheck = require('./middleware/api-check');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

app.use(apiCheck);
app.use(express.static(path.join(__dirname, '/../dist/public')));

app.get('/', routes.base.getLandingPage);

app.get('/movies', routes.movies.getMoviesFromDB);
app.get('/movies/:id', routes.movies.getMovieByIdFromDB);
app.post('/movies', routes.movies.addMovieToDB);
app.delete('/movies', routes.movies.removeMoviesFromDB);
app.delete('/movies', routes.movies.removeSelectedMovieFromDB);
app.patch('/movies/:id', routes.movies.updateMovieInDB);

app.get('/api/search/:title', routes.api.fetchMovieByTitle);
app.get('/api/details/:id', routes.api.fetchMovieDetailsById);

app.get('*', routes.base.redirectToLandingPage);

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }.`);
  });
}

module.exports = { app };
