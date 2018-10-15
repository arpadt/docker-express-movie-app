import { Routes } from '@angular/router';

import { HomeComponent } from '@components/home/home.component';
import { MyListComponent } from '@components/my-list/my-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'mymovies',
    component: MyListComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  }
];
