// import { Action } from '@ngrx/store';

export const ADD_TO_LIST = '[MovieId] ADD_TO_LIST';
export const AddToList = payload => ({ type: 'ADD_TO_LIST', payload });

export const savedMovieIdsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_LIST:
      return [...state, action.payload];
    default:
      return state;
  }
};
