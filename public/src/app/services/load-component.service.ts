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

  public loadComponent(componentToLoad, host) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToLoad.component);

    const viewContainerRef = host.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<Modal>componentRef.instance).movie = componentToLoad.movieData;
  }
}
