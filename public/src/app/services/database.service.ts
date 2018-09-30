import { ErrorHandlingService } from './error-handling.service';
import { catchError, retry } from 'rxjs/operators';
import { Movie } from '@types';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  addMovie(url: string, movie: Movie): Observable<Movie> {
    return this.http
      .post<Movie>(url, movie)
      .pipe(
        catchError(this.errorHandlingService.handleError)
      );
  }

  getAllMovies(url: string): Observable<HttpResponse<Movie[]>> {
    return this.http
      .get<Movie[]>(url, {observe: 'response'})
      .pipe(
        retry(3),
        catchError(this.errorHandlingService.handleError)
      );
  }

  getSelectedMovie(url: string): Observable<HttpResponse<Movie>> {
    return this.http
      .get<Movie>(url, { observe: 'response' })
      .pipe(
        retry(3),
        catchError(this.errorHandlingService.handleError)
      );
  }

  deleteSelectedMovie(url: string): Observable<HttpResponse<Movie>> {
    return this.http
      .delete<Movie>(url, { observe: 'response' })
      .pipe(
        catchError(this.errorHandlingService.handleError)
      );
  }
}
