import { HttpResponse } from '@angular/common/http';
import { Movies, MovieResponse } from './../interface';
import { Component, OnInit } from '@angular/core';
import { MovieDataService } from './../services/movie-data.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  url = environment.apiUrl;
  // TODO: uncomment
  // movies: Movies[];
  movies = [
    {
      Title: 'The Bourne Ultimatum',
      Year: '2007',
      imdbID: 'tt0440963',
      Type: 'movie',
      // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
      Poster: 'https://m.media-amazon.com/images/M/MV5BNGNiNmU2YTMtZmU4OS00MjM0LTlmYWUtMjVlYjAzYjE2N2RjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg'
    },
    {
      Title: 'The Bourne Identity',
      Year: '2002',
      imdbID: 'tt0258463',
      Type: 'movie',
      // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
      Poster: 'https://m.media-amazon.com/images/M/MV5BM2JkNGU0ZGMtZjVjNS00NjgyLWEyOWYtZmRmZGQyN2IxZjA2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg'
    },
    {
      Title: 'The Bourne Supremacy',
      Year: '2004',
      imdbID: 'tt0372183',
      Type: 'movie',
      Poster: 'N/A'
    }
  ];

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit() {
  }

  getMovies(title) {
    this.movieDataService
      .getMovieData(`${ this.url }/search/${ title }`)
      .subscribe((res: HttpResponse<MovieResponse>) => {
        const response: MovieResponse = res.body;
        this.movies = response.Search;
        console.log(this.movies);
      },
      error => console.log(error));
  }
}
