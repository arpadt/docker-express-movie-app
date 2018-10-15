const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB)
  .then(() => console.log('Connected to database.'))
  .catch(() => console.log('Error while connecting to the database.'));

module.exports = { mongoose };
