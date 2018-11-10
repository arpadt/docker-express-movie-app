import * as bodyParser from 'body-parser';
import express, {NextFunction, Request, Response} from 'express';
import logger from 'morgan';
import mongoose = require('mongoose');

import * as routes from './routes';
import { apiCheck, validateTitle } from './middleware';

mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, { useNewUrlParser: true });
    console.log('Connected to database.');

    app.get('/', routes.base.getLandingPage);

    app.get('/api/movies', routes.movies.getMoviesFromDB);
    app.get('/api/movies/:id', routes.movies.getMovieByIdFromDB);
    app.post('/api/movies', routes.movies.addMovieToDB);
    app.delete('/api/movies', routes.movies.removeMoviesFromDB);
    app.delete('/api/movies/:id', routes.movies.removeSelectedMovieFromDB);

    app.get('/api/search/:title', apiCheck, validateTitle(), routes.api.fetchMovieByTitle);
    app.get('/api/details/:id', apiCheck, routes.api.fetchMovieDetailsById);

    app.get('*', routes.base.redirectToLandingPage);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500).send(err);
    });

    const PORT = process.env.PORT || 3000;

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
