import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  model = {
    title: ''
  };
  @Output() findMovieRequest = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(value: string) {
    this.findMovieRequest.emit(value);
  }
}
