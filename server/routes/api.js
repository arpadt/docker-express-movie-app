const express = require('express');

const router = express.Router();

router.get('/search/:title', async (req, res) => {
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
});

router.get('/details/:id', async (req, res) => {
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
});

module.exports = { router };
