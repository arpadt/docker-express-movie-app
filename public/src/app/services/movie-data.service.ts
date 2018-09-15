import { MovieResponse } from './../interface';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  constructor(private http: HttpClient) { }

  getMovieData(url: string): Observable<HttpResponse<MovieResponse>> {
    return this.http
      .get<MovieResponse>(url, { observe: 'response' })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // client side or network error
      console.error('Error: ', error.error.message);
    } else {
      // backend error
      console.error('Error code: ', error.status);
      console.error('Error body: ', error.error);
    }

    return throwError('An error occured');
  }
}
