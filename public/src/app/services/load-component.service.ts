import { Injectable, ComponentFactoryResolver } from '@angular/core';

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
