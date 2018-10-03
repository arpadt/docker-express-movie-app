import { Type } from '@angular/core';

export class NotifierItem {
  constructor(
    public component: Type<any>,
    public data: string
  ) {}
}
