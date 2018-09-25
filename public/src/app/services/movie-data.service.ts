import { ErrorHandlingService } from './error-handling.service';
import { MovieResponse, Movie } from './../interface';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  getMovieData(url: string): Observable<HttpResponse<MovieResponse | Movie>> {
    return this.http
      .get<MovieResponse>(url, { observe: 'response' })
      .pipe(
        retry(3),
        catchError(this.errorHandlingService.handleError)
      );
  }
}
