import { ObjectId } from 'bson';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Awards?: string;
  imdbRating?: string;
  BoxOffice?: string;
  Website?: string;
  Country?: string;
  DVD?: string;
  Metascore?: string;
  Production?: string;
  Ratings?: Ratings[];
  Response?: string;
  Writer?: string;
  imdbVotes?: string;
  _id?: ObjectId;
}

export interface Ratings {
  Source: string;
  Value: string;
}

export interface MovieResponse {
  Search?: Movie[];
  Response: string;
  Error?: string;
  totalResults?: string;
}

export interface Modal {
  movie: Movie;
}

export interface Notifier {
  message: string;
}

export interface MovieState {
  movieId: string;
  isAdded: boolean;
}
