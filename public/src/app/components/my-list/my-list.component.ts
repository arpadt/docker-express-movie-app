import { takeUntil } from 'rxjs/operators';
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
  savedMovies$: Observable<Movie[]>;
  private unsubscribe$ = new Subject();

  movieData: Movie[];
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
    this.savedMovies$ = this.store.pipe(
      select('savedMovies')
    );

    this.databaseService
      // .getAllMovies(this.dbDetailsUrl)
      // TODO: uncomment
      .getAllMovies(this.url)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((res: HttpResponse<Movie[]>) => {
        const response: Movie[] = res.body;
        this.movieData = response;
        this.movieData.forEach((movie) => {
          this.store.dispatch(
            AddMovieToList(movie)
          );
        });
      });
  }

  ngDoCheck() {
    if (this.movieData) {
      this.savedMovies$.pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((movies) => {
        this.movieData = movies;
      });
    }
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
