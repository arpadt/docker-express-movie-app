import { ModalItem } from '@models';
import { ModalComponent } from '@components/modal/modal.component';
import { ModalDirective } from '@directives/modal.directive';
import { environment } from '@environments/environment';
import { HttpResponse } from '@angular/common/http';
import { DatabaseService, LoadComponentService } from '@services';
import { Movie } from '@types';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  selectedMovieDetails: Movie;
  isModalDisplayed: boolean;
  movieData: Movie[];
  @ViewChild(ModalDirective) modalHost: ModalDirective;
  modalComponent: ModalItem;
  // url = `${environment.hostUrl}/movies`;
  // TODO: delete
  apiBasicsUrl = `../../assets/data/api-basics.json`;
  dbDetailsUrl = `../../assets/data/db-details.json`;

  constructor(
    private databaseService: DatabaseService,
    private loadComponentService: LoadComponentService
  ) { }

  ngOnInit() {
    this.databaseService
      .getAllMovies(this.dbDetailsUrl)
      .subscribe((res: HttpResponse<Movie[]>) => {
        const response: Movie[] = res.body;
        this.movieData = response;
      });
  }

  getMovieDetailsFromDB(event) {
    // this.isModalDisplayed = event.isOnlist;
    const selectedMovie = this.movieData.find(({ imdbID }) => event.movieId === imdbID);
    this.modalComponent = new ModalItem(ModalComponent, selectedMovie);
    this.loadComponentService.loadComponent(
      this.modalComponent,
      this.modalHost
    );
    // this.databaseService
    //   .getSelectedMovie(this.dbDetailsUrl)
    //   .subscribe((res) => {
    //     const response = res.body[0];
    //     this.modalComponent = new ModalItem(ModalComponent, response);
    //     // this.selectedMovieDetails = response;
    //     this.loadComponentService.loadComponent(
    //       this.modalComponent,
    //       this.modalHost
    //     );
    //   });
  }

  // modalClosed() {
  //   this.isModalDisplayed = false;
  // }}

}
