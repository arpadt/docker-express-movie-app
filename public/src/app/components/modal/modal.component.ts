import { HttpResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { DatabaseService } from '@services';
import { Movie, Modal, MovieIdState } from '@types';
import { Observable, timer } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AddToList, RemoveFromList } from '@actions';

import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy, Modal {
  savedMovieIds$: Observable<string[]>;
  timer$: Observable<any>;
  showMessage = false;
  movieAddedMessage;
  @Input() movie: Movie | any = {};
  isDisplayed = false;
  isAddedToList = false;
  url = `${ environment.hostUrl }/movies`;

  constructor(
    private databaseService: DatabaseService,
    private store: Store<MovieIdState>,
    ) {
    }

  ngOnInit() {
    this.savedMovieIds$ = this.store.pipe(
      select('savedMovieIds')
    );

    if (!this.isDisplayed) {
      setTimeout(() => {
        // for the animation to work
        this.isDisplayed = true;
      });
    }

    this.savedMovieIds$.subscribe((ids => {
      if (ids.findIndex(id => id === this.movie.imdbID) !== -1) {
        this.isAddedToList = true;
      }
    }));
  }

  ngOnDestroy() {
    this.isDisplayed = false;
    setTimeout(() => {
      this.isAddedToList = false;
    }, 500);
  }

  closeModal() {
    this.ngOnDestroy();
  }

  getFirstEntry(items: string = '') {
    if (!items) {
      return 'N/A';
    }
    return items.split(',')[0];
  }

  addCurrencyToBoxOffice(income: string = '') {
    if (!income) {
      return 'N/A';
    }

    const dollars = income.split(';')[1];
    if (!dollars) {
      return 'N/A';
    }

    return `$${ dollars }`;
  }

  addToList(movieId: string) {
    // TODO: uncomment
    this.databaseService
      .addMovie(this.url, this.movie)
      .subscribe((res) => {
        // some notification here: movie added
        console.log('Movie added');
      },
        error => console.error(error)
    );

    this.store.dispatch(
      new AddToList(movieId)
    );

    this.isAddedToList = true;

    this.showAddedMessage();
  }

  removeFromList(movieId: string) {
    this.databaseService
      .deleteSelectedMovie(`${ this.url }/${ this.movie.imdbID }`)
      .subscribe((res) => {
          const response = res.body;
          console.log('Movie deleted!');
        },
          error => console.error(error)
    );

    this.store.dispatch(
      new RemoveFromList(movieId)
    );

    this.isAddedToList = false;
  }

  showAddedMessage() {
    this.showMessage = true;

    this.timer$ = timer(3000);
    this.timer$.subscribe(() => {
      this.showMessage = false;
    });
  }
}
