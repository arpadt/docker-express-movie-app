import { Movie } from './../interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input('selectedMovie') selectedMovie: Movie;
  @Input() isDisplayed: false;

  movie = {
    Title: 'The Bourne Ultimatum',
    Year: '2007',
    imdbID: 'tt0440963',
    Type: 'movie',
    // tslint:disable-next-line:max-line-length
    Poster: 'https://m.media-amazon.com/images/M/MV5BNGNiNmU2YTMtZmU4OS00MjM0LTlmYWUtMjVlYjAzYjE2N2RjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
    Rated: 'PG-13',
    Released: '03 Aug 2007',
    Runtime: '115 min',
    Genre: 'Action, Mystery, Thriller',
    Director: 'Paul Greengrass',
    Actors: 'Matt Damon, Julia Stiles, David Strathairn, Scott Glenn',
    // tslint:disable-next-line:max-line-length
    Plot: 'Jason Bourne dodges a ruthless C.I.A. official and his Agents from a new assassination program while searching for the origins of his life as a trained killer.',
    Language: 'English, French, Arabic, Russian, Spanish',
    Awards: 'Won 3 Oscars. Another 26 wins & 39 nominations.',
    imdbRating: '8.0',
    BoxOffice: '&pound;227,400,000',
    Website: 'http://www.thebourneultimatum.com/',
    Country: 'USA, Germany, France, Spain',
    DVD: '11 Dec 2007',
    Metascore: '85',
    Production: 'Universal Pictures',
    Ratings: [
      {
        Source: 'Internet Movie Database',
        Value: '8.0/10'
      },
      {
        Source: 'Rotten Tomatoes',
        Value: '93%'
      },
      {
        Source: 'Metacritic',
        Value: '85/100'
      }
    ],
    Response: 'True',
    // tslint:disable-next-line:max-line-length
    Writer: 'Tony Gilroy (screenplay), Scott Z. Burns (screenplay), George Nolfi (screenplay), Tony Gilroy (screen story), Robert Ludlum (novel)',
    imdbVotes: '566,257'
  };

  constructor() { }

  ngOnInit() {
  }

}
