import { DatabaseService } from '../services/database.service';
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

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  getMoreInfo(movieId: string) {
    this.movieDetailsRequest.emit(movieId);
  }

}
