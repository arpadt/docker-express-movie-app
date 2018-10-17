const express = require('express');
const { Types: { ObjectId } } = require('mongoose');

const { Movie } = require('../db/models/movie');

const router = express.Router();

const getAllMoviesFromDB = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (error) {
    res.status(400).send('Error');
  }
};

const getMovieByIdFromDB = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await Movie.find({ imdbID: id });

    if (!movie) {
      return res.status(404).send('Movie not found.');
    }

    res.send(movie);
  } catch (error) {
    res.status(400).send('Error');
  }
};

const addMovietoDB = async (req, res) => {
  const newMovie = new Movie({
    Title: req.body.Title,
    Language: req.body.Language,
    Genre: req.body.Genre,
    Runtime: req.body.Runtime,
    Year: req.body.Year,
    Rated: req.body.Rated,
    Actors: req.body.Actors,
    Plot: req.body.Plot,
    imdbID: req.body.imdbID,
    Director: req.body.Director,
    BoxOffice: req.body.BoxOffice,
    Website: req.body.Website,
    Type: req.body.Type,
    Poster: req.body.Poster,
    Production: req.body.Production,
    Awards: req.body.Awards,
    imdbRating: req.body.imdbRating
  });

  try {
    const movie = await newMovie.save();
    res.status(201).send(movie)
  } catch (error) {
    res.status(400).send('An error occured.')
  }
};

const deleteAllMoviesFromDB = async (req, res) => {
  try {
    await Movie.remove({});
    res.send('Deleted all movies.');
  } catch (error) {
    res.status(400).send('Error');
  }
};

const deleteSelectedMovieFromDB = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findOneAndRemove({ imdbID: id });

    if (!movie) {
      return res.status(404).send('Movie not found.');
    }
    res.status(200).send(movie);
  } catch (error) {
    res.status(400).send('Error');
  }
};

const updateMovieInDB = async (req, res) => {
  const id = req.params.id;

  const body = req.body
  try {
    const movie = await Movie.findByIdAndUpdate(id, body, { new: true });

    if (!movie) {
      return res.status(404).send('Movie not found.');
    }

    res.status(204).send(movie);
  } catch (error) {
    res.status(400).send('Error');
  }
};

router.get('/', getAllMoviesFromDB);
router.post('/', addMovietoDB);
router.delete('/', deleteAllMoviesFromDB);
router.get('/:id', getMovieByIdFromDB);
router.delete('/:id', deleteSelectedMovieFromDB);
router.patch('/:id', updateMovieInDB);

module.exports = { router };
