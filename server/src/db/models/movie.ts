import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const movieSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  Language: String,
  Genre: String,
  Runtime: String,
  Rated: String,
  Actors: String,
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
  Plot: String,
  BoxOffice: String,
  Website: String,
  Production: String,
  imdbRating: String,
  Director: String,
  Awards: String,
});


const Movie = mongoose.model('Movie', movieSchema);

export { Movie };
