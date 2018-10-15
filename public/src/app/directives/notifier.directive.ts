import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[notifierHost]'
})
export class NotifierDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
