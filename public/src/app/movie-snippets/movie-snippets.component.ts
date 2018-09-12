import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-snippets.component.html',
  styleUrls: ['./movie-snippets.component.scss']
})
export class MovieSnippetsComponent implements OnInit {
  @Input() movies;

  constructor() { }

  ngOnInit() {
  }

}
