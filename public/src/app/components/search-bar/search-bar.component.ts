import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  model = {
    title: ''
  };
  @Output() findMovieRequest = new EventEmitter<string>();

  constructor() { }

  onSubmit(value: string) {
    this.findMovieRequest.emit(value);
  }
}
