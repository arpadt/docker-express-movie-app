import { Movie } from '@types';
import {Type} from '@angular/core';

export class ModalItem {
  constructor(
    public component: Type<any>,
    public movieData: Movie,
  ) { }
}
