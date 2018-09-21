import { ErrorHandlingService } from './error-handling.service';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Movie } from './../interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  databaseUrl = environment.databaseUrl;

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http
      .post<Movie>(`${this.databaseUrl}/movies/`, movie)
      .pipe(
        catchError(this.errorHandlingService.handleError)
      );
  }
}
