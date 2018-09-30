import { Action } from '@ngrx/store';

export const ADD_TO_LIST = '[Database] Add to List';
// export const AddToList = payload => ({ type: ADD_TO_LIST, payload });
export class AddToList implements Action {
  readonly type = ADD_TO_LIST;
  constructor (public payload: string) {}
}
