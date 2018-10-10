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
  @Output() movieDetailsRequest = new EventEmitter<any>();

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    console.log('from card', this.movie);
  }

  getMovieDetails(movieId: string) {
    this.movieDetailsRequest.emit(movieId);
  }

}
