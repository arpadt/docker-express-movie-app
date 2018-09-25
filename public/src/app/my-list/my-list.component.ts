import { environment } from './../../environments/environment';
import { HttpResponse } from '@angular/common/http';
import { DatabaseService } from './../services/database.service';
import { Movie } from './../interface';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  selectedMovieDetails: Movie;
  isModalDisplayed: boolean;
  movieData: Movie[];
  url = environment.hostUrl;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.databaseService
      .getAllMovies(`${this.url}/movies`)
      .subscribe((res: HttpResponse<Movie[]>) => {
        const response: Movie[] = res.body;
        this.movieData = response;
      });
  }

  getMovieDetailsFromDB(event) {
    this.isModalDisplayed = event.isOnlist;
    this.databaseService
      .getSelectedMovie(`${ this.url }/movies/${ event.movieId }`)
      .subscribe((res: HttpResponse<Movie>) => {
        const response: Movie = res.body;
        this.selectedMovieDetails = response;
      });
  }

  modalClosed() {
    this.isModalDisplayed = false;
  }

}
