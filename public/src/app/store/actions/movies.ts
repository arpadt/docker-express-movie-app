import { createStandardAction } from 'typesafe-actions';

export const AddToList = createStandardAction('ADD_TO_LIST')<string>();
export const RemoveFromList = createStandardAction('REMOVE_FROM_LIST')<string>();
