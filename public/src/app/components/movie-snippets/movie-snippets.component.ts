import { takeUntil, map } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';
import {
  Component,
  Input,
  ViewChild,
  OnDestroy,
} from '@angular/core';

import { ModalItem } from '@models/components';
import { ModalComponent } from '@components/modal/modal.component';
import { ModalDirective } from '@directives/modal.directive';
import { Movie } from '@types';
import { MovieDataService, LoadComponentService, DatabaseService } from '@services';
import { environment } from '@environments/environment.prod';

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-snippets.component.html',
  styleUrls: ['./movie-snippets.component.scss']
})
export class MovieSnippetsComponent implements OnDestroy {
  unsubscribe$ = new Subject();

  @Input() movies: Movie[];
  @ViewChild(ModalDirective) modalHost: ModalDirective;
  modalComponent: ModalItem;

  apiURL = `${ environment.hostUrl }/details`;
  dbURL = `${ environment.hostUrl }/movies`;

  constructor(
    private movieDataService: MovieDataService,
    private loadComponentService: LoadComponentService,
    private databaseService: DatabaseService,
  ) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getMovieDetails(movieId: string) {
    const movieFromAPI$ = this.movieDataService
      .getMovieData(`${ this.apiURL }/${ movieId }`)
      .pipe(
        takeUntil(this.unsubscribe$),
      map(response => {
        return response.body;
      }),
    );

    const movieFromDB$ = this.databaseService
      .getSelectedMovie(`${ this.dbURL }/${ movieId }`)
      .pipe(
        takeUntil(this.unsubscribe$),
      map(response => {
        return response.body[0];
      }),
    );

    const combinedResponses$ = combineLatest(
      movieFromAPI$,
      movieFromDB$,
    ).pipe(
      takeUntil(this.unsubscribe$),
      map(([movieFromAPI, movieFromDB]) => {
        return movieFromDB && movieFromDB._id
          ? movieFromDB
          : movieFromAPI;
      })
    );

    combinedResponses$.subscribe((movie) => {
      this.modalComponent = new ModalItem(ModalComponent, movie as Movie);
      this.loadComponentService.loadComponent(
        this.modalComponent,
        this.modalHost,
        'movie'
      );
    });
  }
}
