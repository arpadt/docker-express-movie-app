const express = require('express');
const rp = require('request-promise-native');

const router = express.Router();

const fetchMovieByTitle = async (req, res) => {
  const title = req.params.title;

  if (!title) {
    return res.status(400).send('Invalid request.');
  }

  const options = {
    uri: `https://www.omdbapi.com/?s=${ title }&apikey=${ process.env.API_KEY }`,
    method: 'GET',
    json: true
  };

  try {
    const data = await rp(options);
    res.send(data);
  } catch (e) {
    res.status(404).send(e);
  }
};

const fetchMovieDetailsById = async (req, res) => {
  const movieId = req.params.id;

  const options = {
    uri: `https://www.omdbapi.com/?i=${ movieId }&apikey=${ process.env.API_KEY }`,
    method: 'GET',
    json: true
  };

  try {
    const data = await rp(options);
    res.send(data);
  } catch (e) {
    res.status(404).send(e);
  }
};

router.get('/search/:title', fetchMovieByTitle);
router.get('/details/:id', fetchMovieDetailsById);

module.exports = { router };
