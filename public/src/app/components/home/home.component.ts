import { HttpResponse } from '@angular/common/http';
import { Movie, MovieResponse } from '@types';
import { Component, OnInit } from '@angular/core';
import { MovieDataService } from '@services';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  url = environment.hostUrl;
  // TODO: delete
  apiBasicsUrl = `../../assets/data/api-basics.json`;
  movies: Movie[];

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit() {
    console.log(this.apiBasicsUrl);
  }

  getMovies(title) {
    this.movieDataService
      .getMovieData(this.apiBasicsUrl)
      .subscribe((res: HttpResponse<MovieResponse>) => {
        const response: MovieResponse = res.body;
        this.movies = response.Search;
      },
      error => console.log(error));
  }
}
