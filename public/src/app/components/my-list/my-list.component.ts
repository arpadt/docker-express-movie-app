import { takeUntil, map } from 'rxjs/operators';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  DoCheck,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ModalItem } from '@models/components';
import { ModalComponent } from '@components/modal/modal.component';
import { ModalDirective } from '@directives/modal.directive';
import { environment } from '@environments/environment.prod';
import { DatabaseService, LoadComponentService } from '@services';
import { Movie, MovieState } from '@types';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit, OnDestroy, DoCheck {
  moviesToDisplay: Movie[] = [];
  selectedMovie$: Observable<MovieState>;
  private unsubscribe$ = new Subject();

  @ViewChild(ModalDirective) modalHost: ModalDirective;
  modalComponent: ModalItem;
  modalComponentRef: any;
  url = `${environment.hostUrl}/movies`;

  constructor(
    private databaseService: DatabaseService,
    private loadComponentService: LoadComponentService,
    private store: Store<MovieState>,
  ) { }

  ngOnInit() {
    this.databaseService
      .getAllMovies(this.url)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((res) => res.body),
      ).subscribe((movies) => {
        this.moviesToDisplay = movies;
      });

    this.selectedMovie$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select('savedMovies'),
    );
  }

  ngDoCheck() {
    this.selectedMovie$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((movieState) => {
      if (!movieState.isAdded) {
        this.moviesToDisplay = this.moviesToDisplay.filter((movieOnList) => {
          return movieOnList.imdbID !== movieState.movieId;
        });
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getMovieDetailsFromDB(movieId: string) {
    const selectedMovie = this.moviesToDisplay.find(({ imdbID }) => movieId === imdbID);
    this.modalComponent = new ModalItem(ModalComponent, selectedMovie);
    this.modalComponentRef = this.loadComponentService.loadComponent(
      this.modalComponent,
      this.modalHost,
      'movie'
    );
  }

}
