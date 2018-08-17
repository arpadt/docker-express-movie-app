const express = require('express');
const { Types: { ObjectId } } = require('mongoose');

const { Movie } = require('../db/models/movie');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (error) {
    res.status(400).send('Error');
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send('Invalid id!');
  }

  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).send('Movie not found.');
    }

    res.send(movie);
  } catch (error) {
    res.status(400).send('Error');
  }
});

router.post('/', async (req, res) => {
  const newMovie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    isLiked: req.body.isLiked
  });

  try {
    const movie = await newMovie.save();
    res.send(movie)
  } catch (error) {
    res.status(400).send('An error occured.')
  }
});

router.delete('/', async (req, res) => {
  try {
    await Movie.remove({});
    res.send('Deleted all movies.');
  } catch (error) {
    res.status(400).send('Error');
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send('Invalid id!');
  }

  try {
    const movie = await Movie.findByIdAndRemove(id);

    if (!movie) {
      return res.status(404).send('Movie not found.');
    }

    res.send(movie);
  } catch (error) {
    res.status(400).send('Error');
  }
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send('Invalid id!');
  }

  const body = req.body
  try {
    const movie = await Movie.findByIdAndUpdate(id, body, { new: true });

    if (!movie) {
      return res.status(404).send('Movie not found.');
    }

    res.send(movie);
  } catch (error) {
    res.status(400).send('Error');
  }
});

module.exports = { router };
