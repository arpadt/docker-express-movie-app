import { takeUntil, switchMap, map, filter, exhaustMap, find } from 'rxjs/operators';
import { from } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  DoCheck,
  OnChanges,
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AddMovieToList } from '@actions';
import { ModalItem } from '@models/components';
import { ModalComponent } from '@components/modal/modal.component';
import { ModalDirective } from '@directives/modal.directive';
import { environment } from '@environments/environment';
import { HttpResponse } from '@angular/common/http';
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

  // movieData: Movie[] = [];
  @ViewChild(ModalDirective) modalHost: ModalDirective;
  modalComponent: ModalItem;
  modalComponentRef: any;
  url = `${environment.hostUrl}/movies`;
  // TODO: delete
  // apiBasicsUrl = `../../assets/data/api-basics.json`;
  // dbDetailsUrl = `../../assets/data/db-details.json`;

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

    // response$.subscribe((movie) => {
    //   console.log('movie from db', movie);
    //   this.movieData.push(movie);
    //   this.store.dispatch(
    //     AddMovieToList(movie.imdbID)
    //   );
    // });
  }

  ngDoCheck() {
    console.log('do check');
    this.selectedMovie$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((movieState) => {
      console.log('movie state', movieState);
      if (!movieState.isAdded) {
        this.moviesToDisplay = this.moviesToDisplay.filter((movieOnList) => {
          return movieOnList.imdbID !== movieState.movieId;
        });
      }
    });
  }

  ngOnDestroy() {
    console.log('on destroy');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    // this.movieData = [];
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
