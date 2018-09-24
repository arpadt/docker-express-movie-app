import { ErrorHandlingService } from './error-handling.service';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Movie } from './../interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  url = environment.hostUrl;

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  addMovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .post<Movie>(`${this.url}/movies`, movie, httpOptions)
      .pipe(
        catchError(this.errorHandlingService.handleError)
      );
  }
}
