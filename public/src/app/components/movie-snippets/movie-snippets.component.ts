import { ModalItem } from '@models';
import { ModalComponent } from '@components/modal/modal.component';
import { ModalDirective } from '@directives/modal.directive';
import { HttpResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Movie, Modal } from '@types';
import { MovieDataService } from '@services';
import {
  Component,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-snippets.component.html',
  styleUrls: ['./movie-snippets.component.scss']
})
export class MovieSnippetsComponent implements AfterViewInit {
  isOnList = false;
  @Input() movies;
  @ViewChild(ModalDirective) modalHost: ModalDirective;
  modalComponent: ModalItem;
  // TODO: uncomment
  // url = environment.hostUrl/api/details/;
  url = '../../assets/data/api-details.json';

  constructor(
    private movieDataService: MovieDataService,
    private componentFactoryResolver: ComponentFactoryResolver,
   ) {}

  ngAfterViewInit() {
  }

  loadModalComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.modalComponent.component);

    const viewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<Modal>componentRef.instance).movie = this.modalComponent.movieData;
  }

  getMovieDetails(movieId: string) {
    this.movieDataService
      .getMovieData(this.url)
      // .getMovieData(`${ this.url }/${ movieId }`)
      .subscribe((res: HttpResponse<Movie>) => {
        const response: Movie = res.body;
        this.modalComponent = new ModalItem(ModalComponent, response);
        this.loadModalComponent();
      });
  }

}
