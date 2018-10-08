import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';

import { Movie, MovieResponse } from '@types';
import { MovieDataService } from '@services';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  unsubscribe$ = new Subject();

  url = `${ environment.hostUrl }/api/search`;
  // TODO: delete
  // apiBasicsUrl = `../../assets/data/api-basics.json`;
  movies: Movie[];

  constructor(private movieDataService: MovieDataService) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getMovies(title) {
    this.movieDataService
      .getMovieData(`${ this.url }/${ title }`)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      // .getMovieData(`${this.url}/${title}`)
      .subscribe((res: HttpResponse<MovieResponse>) => {
        const response: MovieResponse = res.body;
        this.movies = response.Search;
        },
        error => console.log(error));
  }
}
