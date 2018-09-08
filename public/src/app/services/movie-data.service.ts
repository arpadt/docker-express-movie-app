import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  constructor(private http: Http) { }

  getMovieData(url: string) {
    return this.http.get(url)
      .pipe(map((res: Response) => res.json()));
  }
}
