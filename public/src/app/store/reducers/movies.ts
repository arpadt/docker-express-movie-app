import { getType } from 'typesafe-actions';

import {
  AddMovieToList,
  RemoveMovieFromList,
} from '@actions';

export const savedMoviesReducer = (state = [], action) => {
  switch (action.type) {
    case getType(AddMovieToList):
      return [...state, action.payload];
    case getType(RemoveMovieFromList):
      return state.filter(({ _id }) => _id !== action.payload._id);
    default:
      return state;
  }
};
