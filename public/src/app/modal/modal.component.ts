import { HttpResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { DatabaseService } from './../services/database.service';
import { Movie, Modal } from './../interface';
import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy, Modal {
  @Input() movie: Movie | any = {};
  isDisplayed = false;
  // isAddedToList = false;
  // url = environment.hostUrl;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    if (!this.isDisplayed) {
      setTimeout(() => {
        // for the animation to work
        this.isDisplayed = true;
      });
    }
  }

  ngOnDestroy() {
    // this.isAddedToList = false;
    this.isDisplayed = false;
  }

  closeModal() {
    this.ngOnDestroy();
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

  // addToList() {
    // TODO: uncomment
    // const movieToSave = { ...this.movie, isOnList: true };
    // this.databaseService
    //   .addMovie(`${this.url}/movies`, movieToSave)
    //   .subscribe((res) => {
    //     console.log(res);
    //   },
    //     error => console.error(error)
    // );
    // this.isAddedToList = true;
  // }

  // removeFromList() {
  //   this.databaseService
  //     .deleteSelectedMovie(`${ this.url }/movies/${ this.movie.imdbID }`)
  //     .subscribe((res) => {
  //       const response = res.body;
  //       console.log('Movie deleted!', response);
  //     },
  //       error => console.error(error)
  //     );
  // }

}
