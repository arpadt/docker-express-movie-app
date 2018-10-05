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
import { NotifierItem } from '@models';
import { HttpResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { DatabaseService, LoadComponentService} from '@services';
import { Movie, Modal, MovieIdState } from '@types';
import { Store, select } from '@ngrx/store';
import { AddToList, RemoveFromList } from '@actions';
import { NotifierComponent } from '@components/notifier/notifier/notifier.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy, Modal {
  savedMovieIds$: Observable<string[]>;
  private unsubscribe$ = new Subject();

  @Input() movie: Movie | any = {};

  notifierComponent: NotifierItem;
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
    this.savedMovieIds$ = this.store.pipe(
      select('savedMovieIds')
    );

    if (!this.isDisplayed) {
      timer(0).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(() => {
        this.isDisplayed = true;
      });
    }

    this.savedMovieIds$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((ids => {
      if (ids.findIndex(id => id === this.movie.imdbID) !== -1) {
        this.isAddedToList = true;
      }
    }));
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

  addToList(movieId: string) {
    // TODO: uncomment
    // this.databaseService
    //   .addMovie(this.url, this.movie)
    //   .subscribe((res) => {
    //     // some notification here: movie added
    //     console.log('Movie added');
    //   },
    //     error => console.error(error)
    // );

    this.store.dispatch(
      new AddToList(movieId)
    );

    this.isAddedToList = true;

    this.displayNotifier('Movie added!');
  }

  removeFromList(movieId: string) {
    // TODO: uncomment
    // this.databaseService
    //   .deleteSelectedMovie(`${ this.url }/${ this.movie.imdbID }`)
    //   .subscribe((res) => {
    //       const response = res.body;
    //       console.log('Movie deleted!');
    //     },
    //       error => console.error(error)
    // );

    this.store.dispatch(
      new RemoveFromList(movieId)
    );

    this.isAddedToList = false;

    this.displayNotifier('Movie removed!');
  }

  displayNotifier(message: string) {
    this.notifierComponent = new NotifierItem(NotifierComponent, message);

    this.loadComponentService.loadComponent(
      this.notifierComponent,
      this.notifierHost,
      'message'
    );
  }
}
