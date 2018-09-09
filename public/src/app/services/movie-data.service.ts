import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  constructor(private http: HttpClient) { }

  getMovieData(url: string) {
    return this.http.get(url, {observe: 'response'});
  }
}
