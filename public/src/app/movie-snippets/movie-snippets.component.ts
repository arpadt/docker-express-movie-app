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
  isOnList = false;
  @Input() movies;
  // TODO: uncomment
  // url = environment.hostUrl/api/details/;
  url = '../../assets/data/api-details.json';
  selectedMovieDetails:  Movie | any = {};
  isModalDisplayed: boolean;

  constructor(private movieDataService: MovieDataService) { }

  getMovieDetails(movieId: string) {
    this.movieDataService
      .getMovieData(this.url)
      // .getMovieData(`${ this.url }/${ movieId }`)
      .subscribe((res: HttpResponse<Movie>) => {
        const response: Movie = res.body;
        this.selectedMovieDetails = response;
      });
    this.isModalDisplayed = true;
  }

  modalClosed() {
    this.isModalDisplayed = false;
  }

}
