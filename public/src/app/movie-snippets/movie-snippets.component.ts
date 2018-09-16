import { HttpResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Movies } from './../interface';
import { MovieDataService } from './../services/movie-data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-snippets.component.html',
  styleUrls: ['./movie-snippets.component.scss']
})
export class MovieSnippetsComponent implements OnInit {
  isList = false;
  @Input() movies;
  movieId: Movies;
  url = environment.apiUrl;


  constructor(private movieDataService: MovieDataService) { }

  ngOnInit() {
  }

  getMovieDetails(movieId: string) {
    this.movieDataService
      .getMovieData(`${ this.url }/api/details/${ movieId }`)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
