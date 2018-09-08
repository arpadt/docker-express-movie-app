import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MovieSnippetsComponent } from './movie-snippets/movie-snippets.component';
import { MyListComponent } from './my-list/my-list.component';
import { CardComponent } from './card/card.component';
import { ModalComponent } from './modal/modal.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
