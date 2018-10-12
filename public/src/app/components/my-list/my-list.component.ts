import { takeUntil, switchMap, map, filter, exhaustMap, find } from 'rxjs/operators';
import { from } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  DoCheck
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AddMovieToList } from '@actions';
import { MovieIdState } from '@types';
import { ModalItem } from '@models/components';
import { ModalComponent } from '@components/modal/modal.component';
import { ModalDirective } from '@directives/modal.directive';
import { environment } from '@environments/environment';
import { HttpResponse } from '@angular/common/http';
import { DatabaseService, LoadComponentService } from '@services';
import { Movie } from '@types';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit, OnDestroy, DoCheck {
  moviesInStore$: Observable<Movie[]>;
  private unsubscribe$ = new Subject();

  movieData: Movie[] = [];
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
    private store: Store<MovieIdState>,
  ) { }

  ngOnInit() {
    this.moviesInStore$ = this.store.pipe(
      select('savedMovies')
    );
    const response$ = this.databaseService.getAllMovies(this.url);

    const moviesToDisplay$ = response$.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((res) => from(res.body)),
      exhaustMap((movieFromDB: Movie) => {
        this.store.dispatch(
          AddMovieToList(movieFromDB)
        );
        return this.moviesInStore$.pipe(
          switchMap((movies) => from(movies)),
          find((movie) => {
            return movie.imdbID === movieFromDB.imdbID;
          }),
        );
      }),
    );

    moviesToDisplay$.subscribe((movie) => {
      console.log('filtered movie', movie);
      this.movieData.push(movie);
    });
  }

  ngDoCheck() {
    // this.moviesInStore$.pipe(
    //   takeUntil(this.unsubscribe$),
    // ).subscribe((movies) => {
    //   this.movieData = movies;
    // });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getMovieDetailsFromDB(movieId: string) {
    const selectedMovie = this.movieData.find(({ imdbID }) => movieId === imdbID);
    this.modalComponent = new ModalItem(ModalComponent, selectedMovie);
    this.modalComponentRef = this.loadComponentService.loadComponent(
      this.modalComponent,
      this.modalHost,
      'movie'
    );
  }

}
