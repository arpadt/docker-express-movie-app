require('./config/config');

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
const { promisify } = require('util');

// require('./db/connect');
const { connectToDB } = require('./db/connect');
const { router: moviesRoutes } = require('./routes/movies');
const { router: landingPageRoute } = require('./routes/base');
const { router: apiRoutes } = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../dist/public')));

app.use(cors());

app.use('/', landingPageRoute);
app.use('/movies', moviesRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectToDB();
    console.log('Connected to the database.');

    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`App is running on port ${ PORT }.`);
      });
    }
  } catch (e) {
    console.log('Failed to connect to the database', e);
  }
}

start();
// if (process.env.NODE_ENV !== 'test') {
//   app.listen(PORT, () => {
//     console.log(`App is running on port ${ PORT }.`);
//   });
// }

module.exports = { app };
