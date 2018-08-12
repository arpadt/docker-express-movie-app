const bodyParser = require('body-parser');
const express = require('express');

require('./db/config/connect');
const { router: moviesRoutes } = require('./routes/movies');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('It works!');
});

app.use('/movies', moviesRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App is running on port ${ PORT }.`);
});
