require('./config/config');

import * as bodyParser from 'body-parser';
import express from 'express';
import * as path from 'path';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import mongoose = require('mongoose');

mongoose.Promise = global.Promise;

import * as routes from '@routes';
import { apiCheck, validation } from '@middleware';

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGODB as string, { useNewUrlParser: true });
    console.log('Connected to database.');

    app.use(express.static(path.join(__dirname, '/../dist/public')));

    app.get('/', routes.base.getLandingPage);

    app.get('/movies', routes.movies.getMoviesFromDB);
    app.get('/movies/:id', routes.movies.getMovieByIdFromDB);
    app.post('/movies', routes.movies.addMovieToDB);
    app.delete('/movies', routes.movies.removeMoviesFromDB);
    app.delete('/movies', routes.movies.removeSelectedMovieFromDB);
    app.patch('/movies/:id', routes.movies.updateMovieInDB);

    app.get('/api/search/:title', apiCheck as any, validation.validateTitle(), routes.api.fetchMovieByTitle);
    app.get('/api/details/:id', apiCheck as any, routes.api.fetchMovieDetailsById);

    app.get('*', routes.base.redirectToLandingPage);

    const PORT = process.env.PORT || 8080;

    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`App is running on port ${ PORT }.`);
      });
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

main();

export { app };
