const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', {
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String
  },
  isLiked: {
    type: Boolean
  }
});

module.exports = { Movie };
