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
      Poster: '../../assets/img/poster.jpg'
    },
    {
      Title: 'The Bourne Supremacy',
      Year: '2004',
      Type: 'movie',
      Poster: '../../assets/img/poster.jpg'
    },
    {
      Title: 'The Bourne Ultimatum',
      Year: '2007',
      Type: 'movie',
      Poster: '../../assets/img/poster.jpg'
    },
    {
      Title: 'Jason Bourne',
      Year: '2016',
      Type: 'movie',
      Poster: '../../assets/img/poster.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
