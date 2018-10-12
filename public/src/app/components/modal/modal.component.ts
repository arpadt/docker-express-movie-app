import { Observable, timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { NotifierDirective } from '@directives/notifier.directive';
import { NotifierItem } from '@models/components';
import { HttpResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { DatabaseService, LoadComponentService} from '@services';
import { Movie, Modal, MovieIdState } from '@types';
import { Store, select } from '@ngrx/store';
import {
  AddMovieToList,
  RemoveMovieFromList,
} from '@actions';
import { NotifierComponent } from '@components/notifier/notifier/notifier.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy, Modal {
  savedMovies$: Observable<Movie[]>;
  unsubscribe$ = new Subject();
  deletedMovie$ = new Subject();

  @Input() movie: Movie | any = {};

  @ViewChild(NotifierDirective) notifierHost: NotifierDirective;

  isDisplayed = false;
  isAddedToList = false;

  url = `${ environment.hostUrl }/movies`;

  constructor(
    private databaseService: DatabaseService,
    private store: Store<MovieIdState>,
    private loadComponentService: LoadComponentService,
    ) {
    }

  ngOnInit() {
    this.savedMovies$ = this.store.pipe(
      select('savedMovies')
    );

    if (!this.isDisplayed) {
      timer(0).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(() => {
        this.isDisplayed = true;
      });
    }

    this.savedMovies$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((movies) => {
      if (movies.find(({ imdbID }) => imdbID === this.movie.imdbID)) {
        this.isAddedToList = true;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  closeModal() {
    this.isDisplayed = false;

    timer(500).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.isAddedToList = false;
      });

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
    return dollars
      ? `$${ dollars }`
      : 'N/A';
  }

  addToList() {
    // TODO: uncomment
    this.databaseService
      .addMovie(this.url, this.movie)
      .subscribe((res) => {
        this.store.dispatch(
          AddMovieToList(res)
        );
        this.displayNotifier('Movie added!');
        this.isAddedToList = true;
      },
        error => console.error(error)
    );
  }

  removeFromList() {
    // TODO: uncomment
    this.databaseService
      .deleteSelectedMovie(`${ this.url }/${ this.movie.imdbID }`)
      .subscribe((res) => {
        const response = res.body;
        this.store.dispatch(
          RemoveMovieFromList(response)
        );
        this.displayNotifier('Movie removed!');
        this.isAddedToList = false;
        },
          error => console.error(error)
    );
  }

  displayNotifier(message: string) {
    const notifierComponent = new NotifierItem(NotifierComponent, message);

    this.loadComponentService.loadComponent(
      notifierComponent,
      this.notifierHost,
      'message'
    );
  }
}
