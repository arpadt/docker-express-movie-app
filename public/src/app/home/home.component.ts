import { Component, OnInit } from '@angular/core';
import { MovieDataService } from './../services/movie-data.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

interface Movies {
  Title: string;
  Year: string;
  imdbId: string;
  Type: string;
  Poster: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Awards?: string;
  imdbRating?: string;
  BoxOffice?: string;
  Website?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  url = environment.apiUrl;
  movies: Observable<Movies[]>;

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit() {
  }

  getMovies(title) {
    this.movieDataService
      .getMovieData(`${ this.url }/search/${ title }`)
      .subscribe(res => console.log(res.body));
  }
}
