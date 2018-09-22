import { DatabaseService } from './../services/database.service';
import { Movie } from './../interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('selectedMovie') movie: Movie | any = {};
  @Input() isDisplayed: boolean;
  @Output() closeModalEvent = new EventEmitter();
  isList = false;
  // movie = {
  //   Title: 'The Bourne Ultimatum',
  //   Year: '2007',
  //   imdbID: 'tt0440963',
  //   Type: 'movie',
  //   // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
  //   Poster: 'https://m.media-amazon.com/images/M/MV5BNGNiNmU2YTMtZmU4OS00MjM0LTlmYWUtMjVlYjAzYjE2N2RjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
  //   Rated: 'PG-13',
  //   Released: '03 Aug 2007',
  //   Runtime: '115 min',
  //   Genre: 'Action, Mystery, Thriller',
  //   Director: 'Paul Greengrass',
  //   Actors: 'Matt Damon, Julia Stiles, David Strathairn, Scott Glenn',
  //   // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
  //   Plot: 'Jason Bourne dodges a ruthless C.I.A. official and his Agents from a new assassination program while searching for the origins of his life as a trained killer.',
  //   Language: 'English, French, Arabic, Russian, Spanish',
  //   Awards: 'Won 3 Oscars. Another 26 wins & 39 nominations.',
  //   imdbRating: '8.0',
  //   BoxOffice: '&pound;227,400,000',
  //   Website: 'http://www.thebourneultimatum.com/',
  //   Country: 'USA, Germany, France, Spain',
  //   DVD: '11 Dec 2007',
  //   Metascore: '85',
  //   Production: 'Universal Pictures',
  //   Ratings: [
  //     {
  //       Source: 'Internet Movie Database',
  //       Value: '8.0/10'
  //     },
  //     {
  //       Source: 'Rotten Tomatoes',
  //       Value: '93%'
  //     },
  //     {
  //       Source: 'Metacritic',
  //       Value: '85/100'
  //     }
  //   ],
  //   Response: 'True',
  //   // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
  //   Writer: 'Tony Gilroy (screenplay), Scott Z. Burns (screenplay), George Nolfi (screenplay), Tony Gilroy (screen story), Robert Ludlum (novel)',
  //   imdbVotes: '566,257'
  // };

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  closeModal() {
    this.closeModalEvent.emit();
    this.movie = {};
  }

  getFirstEntry(items: string = '') {
    if (!items) {
      return 'N/A';
    }
    return items.split(',')[0];
  }

  addCurrencyToBoxOffice(income: string = '') {
    if (!income) {
      return 'N/A';
    }

    const dollars = income.split(';')[1];
    if (!dollars) {
      return 'N/A';
    }

    return `$${ dollars }`;
  }

  addToList() {
    this.databaseService
      .addMovie(this.movie)
      .subscribe((res) => {
        console.log(res);
      },
        error => console.error(error)
    );

    this.isList = true;
  }

  removeFromList() {
    console.log('Remove from list');
  }

}
