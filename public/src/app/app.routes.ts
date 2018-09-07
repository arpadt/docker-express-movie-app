import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MyListComponent } from './my-list/my-list.component';
import { ModalComponent } from './modal/modal.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'my-list',
    component: MyListComponent,
  },
  {
    path: 'modal',
    component: ModalComponent,
  },
];
