require('./config/config');

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const rp = require('request-promise-native');

require('./db/connect');
const { router: moviesRoutes } = require('./routes/movies');
const { router: landingPageRoute } = require('./routes/base');

const app = express();

app.use(bodyParser.json());

app.use('/', landingPageRoute);
app.get('/search/:title', async (req, res) => {
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
app.use('/movies', moviesRoutes);

app.use(express.static(path.join(__dirname, '../dist/public')))

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }.`);
  });
}

module.exports = { app };
