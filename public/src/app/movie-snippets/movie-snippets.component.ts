import { ModalComponent } from './../modal/modal.component';
import { HttpResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Movie } from './../interface';
import { MovieDataService } from './../services/movie-data.service';
import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-snippets.component.html',
  styleUrls: ['./movie-snippets.component.scss']
})
export class MovieSnippetsComponent implements AfterViewInit {
  isList = false;
  @Input() movies;
  url = environment.apiUrl;
  selectedMovieDetails: Movie;
  // @ViewChild('modal') modal: ElementRef;
  @ViewChild('modalComponent', {read: ElementRef}) modal: ElementRef;


  constructor(private movieDataService: MovieDataService) { }

  ngAfterViewInit() {
    // console.log('modal: ', this.modalComponent);
  }

  getMovieDetails(movieId: string) {
    // this.movieDataService
    //   .getMovieData(`${ this.url }/api/details/${ movieId }`)
    //   .subscribe((res: HttpResponse<Movie>) => {
    //     // console.log(res);
    //     const response: Movie = res.body;
    //     this.selectedMovieDetails = response;
    //     console.log(this.selectedMovieDetails);
    //   });
    console.log('modal: ', this.modal.nativeElement);
  }
}
