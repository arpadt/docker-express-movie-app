import { DatabaseService } from '@services';
import { Movie } from '@types';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  @Input() movie: Movie;
  @Output() movieDetailsRequest = new EventEmitter<any>();

  constructor(private databaseService: DatabaseService) { }

  getMovieDetails(movieId: string) {
    this.movieDetailsRequest.emit(movieId);
  }

}
