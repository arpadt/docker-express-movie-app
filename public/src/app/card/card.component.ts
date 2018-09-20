import { Movie } from './../interface';
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
  @Input() movie: Movie;
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
    this.movieDetailsRequest.emit(movieId);
  }

}
