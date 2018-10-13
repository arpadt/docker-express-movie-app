import { getType } from 'typesafe-actions';

import {
  AddMovieToList,
  RemoveMovieFromList,
} from '@actions';

export const savedMoviesReducer = (state: string[] = [], action) => {
  switch (action.type) {
    case getType(AddMovieToList):
      return Array.from(new Set([...state, action.payload]));
    case getType(RemoveMovieFromList):
      return state.filter((imdbID) => imdbID !== action.payload);
    default:
      return state;
  }
};
