import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[modalHost]'
})
export class ModalDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
