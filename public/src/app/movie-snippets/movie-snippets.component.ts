import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-snippets.component.html',
  styleUrls: ['./movie-snippets.component.scss']
})
export class MovieSnippetsComponent implements OnInit {
  isList = false;
  @Input() movies;

  constructor() { }

  ngOnInit() {
  }

}
