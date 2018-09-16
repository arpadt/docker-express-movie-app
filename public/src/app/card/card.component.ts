import { Movies } from './../interface';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {
  @Input() movie: Movies;
  @Input() isList: boolean;
  @Output() movieDetailsRequest = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  addToList() {
    console.log('Added to list');
  }

  removeFromList() {
    console.log('Remove from list');
  }

  getMoreInfo(movieId: string) {
    // get the id of the movie, emit event
    this.movieDetailsRequest.emit(movieId);
    // make detailed request to the API - service
    // add response to movie details object - in modal
    // set class to is-visible - in modal
    // console.log(movieId);
  }

}
