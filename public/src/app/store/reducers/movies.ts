import { MovieState } from '@types';
import { getType } from 'typesafe-actions';

import {
  AddMovieToList,
  RemoveMovieFromList,
} from '@actions';

export function savedMoviesReducer(state: MovieState = {
  movieId: '',
  isAdded: false
}, action) {
  switch (action.type) {
    case getType(AddMovieToList):
      return { ...state, movieId: action.payload.movieId, isAdded: true};
    case getType(RemoveMovieFromList):
      return { ...state, movieId: action.payload.movieId, isAdded: false };
    default:
      return state;
  }
}
