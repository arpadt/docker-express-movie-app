import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  handleError(error: HttpErrorResponse) {
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
