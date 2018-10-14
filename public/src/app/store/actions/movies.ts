import { MovieState } from '@types';
import { createStandardAction } from 'typesafe-actions';

export const AddMovieToList = createStandardAction('ADD_MOVIE_TO_LIST')<MovieState>();
export const RemoveMovieFromList = createStandardAction('REMOVE_MOVIE_FROM_LIST')<MovieState>();
