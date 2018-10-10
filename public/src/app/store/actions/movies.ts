import { Movie } from '@types';
import { createStandardAction } from 'typesafe-actions';

export const AddIdToList = createStandardAction('ADD_TO_LIST')<string>();
export const RemoveIdFromList = createStandardAction('REMOVE_FROM_LIST')<string>();
export const AddMovieToList = createStandardAction('ADD_MOVIE_TO_LIST')<Movie>();
export const RemoveMovieFromList = createStandardAction('REMOVE_MOVIE_FROM_LIST')<Movie>();
