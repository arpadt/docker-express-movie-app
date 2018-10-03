import { Modal } from '@types';
import { ModalDirective } from '@directives/modal.directive';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { ModalItem } from '@models';

@Injectable({
  providedIn: 'root'
})
export class LoadComponentService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  public loadComponent(
    componentToLoad,
    host,
    dataProperty: string
  ) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToLoad.component);

    const viewContainerRef = host.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance)[dataProperty] = componentToLoad.data;
  }
}
