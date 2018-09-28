import { Movie } from './../interface';
import {Type} from '@angular/core';

export class ModalItem {
  constructor(
    public component: Type<any>,
    public movieData: Movie,
  ) { }
}
