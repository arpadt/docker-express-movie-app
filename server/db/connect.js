const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connectToDB = () => {
  return mongoose.connect(process.env.MONGODB)
}
// .then(() => console.log('Connected to database.'))
// .catch(() => console.log('Error while connecting to the database.'));

module.exports = { connectToDB };
