import { HttpResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Movie } from './../interface';
import { MovieDataService } from './../services/movie-data.service';
import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-snippets.component.html',
  styleUrls: ['./movie-snippets.component.scss']
})
export class MovieSnippetsComponent {
  isList = false;
  @Input() movies;
  url = environment.hostUrl;
  selectedMovieDetails:  Movie | any = {};
  isModalDisplayed: boolean;

  constructor(private movieDataService: MovieDataService) { }

  getMovieDetails(movieId: string) {
    this.movieDataService
      .getMovieData(`${ this.url }/api/details/${ movieId }`)
      .subscribe((res: HttpResponse<Movie>) => {
        // console.log(res);
        const response: Movie = res.body;
        this.selectedMovieDetails = response;
        // console.log(this.selectedMovieDetails);
      });
    this.isModalDisplayed = true;
  }

  modalClosed() {
    this.isModalDisplayed = false;
  }

}
