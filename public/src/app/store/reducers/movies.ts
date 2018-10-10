import { getType } from 'typesafe-actions';

import {
  AddIdToList,
  RemoveIdFromList,
  AddMovieToList,
  RemoveMovieFromList,
} from '@actions';

export const savedMovieIdsReducer = (state = [], action) => {
  switch (action.type) {
    case getType(AddIdToList):
      return [...state, action.payload];
    case getType(RemoveIdFromList):
      return state.filter((id) => id !== action.payload);
    case getType(AddMovieToList):
      return [...state, action.payload];
    case getType(RemoveMovieFromList):
      return state.filter(({ _id }) => _id !== action.payload._id);
    default:
      return state;
  }
};

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
