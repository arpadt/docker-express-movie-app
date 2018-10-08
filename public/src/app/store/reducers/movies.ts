import { getType } from 'typesafe-actions';

import { AddToList, RemoveFromList } from '@actions';


export const savedMovieIdsReducer = (state = [], action) => {
  switch (action.type) {
    case getType(AddToList):
      return [...state, action.payload];
    case getType(RemoveFromList):
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
};
