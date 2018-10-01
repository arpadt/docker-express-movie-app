import {
  ADD_TO_LIST,
  AddToList,
  REMOVE_FROM_LIST,
  RemoveFromList
} from '@actions';

type MovieId = AddToList & RemoveFromList;

export const savedMovieIdsReducer = (
  state: string[] = [],
  action: MovieId) => {
  switch (action.type) {
    case ADD_TO_LIST:
      return [...state, action.payload];
    case REMOVE_FROM_LIST:
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
};
