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
  url = environment.apiUrl;
  selectedMovieDetails: Movie;
  isModalDisplayed: boolean;

  constructor(private movieDataService: MovieDataService) { }

  getMovieDetails(movieId: string) {
    // this.movieDataService
    //   .getMovieData(`${ this.url }/api/details/${ movieId }`)
    //   .subscribe((res: HttpResponse<Movie>) => {
    //     // console.log(res);
    //     const response: Movie = res.body;
    //     this.selectedMovieDetails = response;
    //     console.log(this.selectedMovieDetails);
    //   });
    // console.log('modal: ', this.modal.nativeElement);
    this.isModalDisplayed = true;
  }

  modalClosed() {
    this.isModalDisplayed = false;
  }

}
