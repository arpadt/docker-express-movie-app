import { DatabaseService } from '@services';
import { Movie } from '@types';
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
  @Output() movieDetailsRequest = new EventEmitter<any>();
  @Output() removeFromListEvent = new EventEmitter<any>();

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  getMovieDetails(movieId: string) {
    this.movieDetailsRequest.emit(movieId);
  }

}
