import { HttpResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { DatabaseService } from './../services/database.service';
import { Movie } from './../interface';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('selectedMovie') movie: Movie | any = {};
  @Input() isDisplayed: boolean;
  @Output() closeModalEvent = new EventEmitter();
  isAddedToList = false;
  url = environment.hostUrl;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    console.log('on init');
  }

  ngOnDestroy() {
    this.isAddedToList = false;
    console.log('on destroy');
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
    // TODO: uncomment
    // const movieToSave = { ...this.movie, isOnList: true };
    // this.databaseService
    //   .addMovie(`${this.url}/movies`, movieToSave)
    //   .subscribe((res) => {
    //     console.log(res);
    //   },
    //     error => console.error(error)
    // );
    this.isAddedToList = true;
  }

  removeFromList() {
    this.databaseService
      .deleteSelectedMovie(`${ this.url }/movies/${ this.movie.imdbID }`)
      .subscribe((res) => {
        const response = res.body;
        console.log('Movie deleted!', response);
      },
        error => console.error(error)
      );
  }

}
