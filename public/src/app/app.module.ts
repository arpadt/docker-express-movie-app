import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@components/home/home.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { MovieSnippetsComponent } from '@components/movie-snippets/movie-snippets.component';
import { MyListComponent } from '@components/my-list/my-list.component';
import { CardComponent } from '@components/card/card.component';
import { ModalComponent } from '@components/modal/modal.component';
import { ModalDirective } from '@directives/modal.directive';

import { savedMovieIdsReducer, savedMoviesReducer } from '@reducers';
import { NotifierComponent } from './components/notifier/notifier/notifier.component';
import { NotifierDirective } from './directives/notifier.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    SearchBarComponent,
    MovieSnippetsComponent,
    MyListComponent,
    CardComponent,
    ModalComponent,
    ModalDirective,
    NotifierComponent,
    NotifierDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      savedMovieIds: savedMovieIdsReducer,
      savedMovies: savedMoviesReducer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
    NotifierComponent
  ]
})
export class AppModule { }
