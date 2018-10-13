import { Movie } from '@types';
import { createStandardAction } from 'typesafe-actions';

export const AddMovieToList = createStandardAction('ADD_MOVIE_TO_LIST')<string>();
export const RemoveMovieFromList = createStandardAction('REMOVE_MOVIE_FROM_LIST')<string>();
