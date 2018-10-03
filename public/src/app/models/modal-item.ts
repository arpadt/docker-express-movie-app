import { Movie } from '@types';
import {Type} from '@angular/core';

export class ModalItem {
  constructor(
    public component: Type<any>,
    public data: Movie,
  ) { }
}
