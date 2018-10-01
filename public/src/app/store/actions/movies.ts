import { Action } from '@ngrx/store';

export const ADD_TO_LIST = '[Database] Add to List';
export const REMOVE_FROM_LIST = '[Database] Remove from List';

export class AddToList implements Action {
  readonly type = ADD_TO_LIST;
  constructor (public payload: string) {}
}

export class RemoveFromList implements Action {
  readonly type = REMOVE_FROM_LIST;
  constructor (public payload: string) {}
}
