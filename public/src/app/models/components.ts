import { Type } from '@angular/core';
import { Movie } from '@types';

export class NotifierItem {
  constructor(
    public component: Type<any>,
    public data: string
  ) {}
}

export class ModalItem {
  constructor(
    public component: Type<any>,
    public data: Movie,
  ) { }
}
