import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import {
  Component,
  Input,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { ModalItem } from '@models';
import { ModalComponent } from '@components/modal/modal.component';
import { ModalDirective } from '@directives/modal.directive';
import { Movie } from '@types';
import { MovieDataService, LoadComponentService } from '@services';

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
  // TODO: uncomment
  // url = `${environment.hostUrl}/api/details`;
  url = '../../assets/data/api-details.json';

  constructor(
    private movieDataService: MovieDataService,
    private loadComponentService: LoadComponentService
   ) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getMovieDetails(movieId: string) {
    this.movieDataService
      .getMovieData(this.url)
      // TODO: uncomment
      // .getMovieData(`${ this.url }/${ movieId }`)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((res: HttpResponse<Movie>) => {
        const response: Movie = res.body;
        this.modalComponent = new ModalItem(ModalComponent, response);
        this.loadComponentService.loadComponent(
          this.modalComponent,
          this.modalHost,
          'movie'
        );
      });
  }

}
