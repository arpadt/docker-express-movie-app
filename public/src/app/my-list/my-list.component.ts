import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  isList = true;
  movieData = [
    {
      Title: 'The Bourne Ultimatum',
      Year: '2007',
      imdbID: 'tt0440963',
      Type: 'movie',
      // tslint:disable-next-line:max-line-length
      // tslint:disable-next-line:max-line-length
      Poster: 'https://m.media-amazon.com/images/M/MV5BNGNiNmU2YTMtZmU4OS00MjM0LTlmYWUtMjVlYjAzYjE2N2RjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg'
    },
    {
      Title: 'The Bourne Identity',
      Year: '2002',
      imdbID: 'tt0258463',
      Type: 'movie',
      // tslint:disable-next-line:max-line-length
      // tslint:disable-next-line:max-line-length
      Poster: 'https://m.media-amazon.com/images/M/MV5BM2JkNGU0ZGMtZjVjNS00NjgyLWEyOWYtZmRmZGQyN2IxZjA2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg'
    },
    {
      Title: 'The Bourne Supremacy',
      Year: '2004',
      imdbID: 'tt0372183',
      Type: 'movie',
      Poster: 'N/A'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
