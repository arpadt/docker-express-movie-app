const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', {
  Title: {
    type: String,
    required: true
  },
  Genre: String,
  Year: {
    type: String,
    required: true
  },
  imdbID: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  Poster: {
    type: String,
    required: true
  },
  Rated: String,
  Released: String,
  Runtime: String,
  Director: String,
  Actors: String,
  Plot: String,
  Language: String,
  Awards: String,
  imdbRating: String,
  BoxOffice: String,
  Website: String,
  Country: String,
  DVD: String,
  Metascore: String,
  Production: String,
  Ratings: [
    {
      Source: String,
      Value: String
    }
  ],
  Response: String,
  Writer: String,
  imdbVotes: String
});

module.exports = { Movie };
