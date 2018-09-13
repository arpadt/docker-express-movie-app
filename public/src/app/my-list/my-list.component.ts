import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  movieData = [
    {
      Title: 'The Bourne Identity',
      Year: '2002',
      Type: 'movie',
      // tslint:disable-next-line:max-line-length
      Poster: 'https://m.media-amazon.com/images/M/MV5BM2JkNGU0ZGMtZjVjNS00NjgyLWEyOWYtZmRmZGQyN2IxZjA2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg'
    },
    {
      Title: 'The Bourne Supremacy',
      Year: '2004',
      Type: 'movie',
      // tslint:disable-next-line:max-line-length
      Poster: 'https://m.media-amazon.com/images/M/MV5BYTIyMDFmMmItMWQzYy00MjBiLTg2M2UtM2JiNDRhOWE4NjBhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
    },
    {
      Title: 'The Bourne Ultimatum',
      Year: '2007',
      Type: 'movie',
      // tslint:disable-next-line:max-line-length
      Poster: 'https://m.media-amazon.com/images/M/MV5BNGNiNmU2YTMtZmU4OS00MjM0LTlmYWUtMjVlYjAzYjE2N2RjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
