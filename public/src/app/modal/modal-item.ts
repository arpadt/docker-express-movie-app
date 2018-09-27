import { Modal } from './../interface';
import {Type} from '@angular/core';

export class ModalItem {
  constructor(
    public component: Type<any>,
    public modalData: Modal
  ) { }
}
