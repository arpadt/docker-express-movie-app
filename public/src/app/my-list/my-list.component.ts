import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  movieData = [
    {
      title: 'The Bourne Identity',
      year: '2002',
      rated: '14',
      length: '119',
      language: 'English',
      actors: 'Matt Damon, Franka Potente, Chris Cooper, Clive Owen',
      // tslint:disable-next-line:max-line-length
      plot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in lobortis tell et feugiat purus.Suspendisse convallis malesuada ultricies.',
      imdbRating: '7.9',
      poster: '../../assets/img/poster.jpg'
    },
    {
      title: 'The Bourne Supremacy',
      year: '2004',
      rated: 'M',
      length: '108',
      language: 'English',
      actors: 'Matt Damon, Franka Potente, Joan Allen',
      // tslint:disable-next-line:max-line-length
      plot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in lobortis tell et feugiat purus.Suspendisse convallis malesuada ultricies.',
      imdbRating: '7.8',
      poster: '../../assets/img/poster.jpg'
    },
    {
      title: 'The Bourne Ultimatum',
      year: '2007',
      rated: '16',
      length: '115',
      language: 'English',
      actors: 'Matt Damon, Edgar Ramirez, Joan Allen',
      // tslint:disable-next-line:max-line-length
      plot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in lobortis tell et feugiat purus.Suspendisse convallis malesuada ultricies.',
      imdbRating: '8.0',
      poster: '../../assets/img/poster.jpg'
    },
    {
      title: 'Jason Bourne',
      year: '2016',
      rated: '12A',
      length: '123',
      language: 'English',
      actors: 'Matt Damon, Tommy Lee Jones, Alicia Vikander',
      // tslint:disable-next-line:max-line-length
      plot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in lobortis tell et feugiat purus.Suspendisse convallis malesuada ultricies.',
      imdbRating: '6.6',
      poster: '../../assets/img/poster.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
