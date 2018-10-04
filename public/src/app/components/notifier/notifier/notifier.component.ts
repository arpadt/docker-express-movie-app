import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit, OnDestroy {
  isDisplayed = false;

  constructor() { }

  ngOnInit() {
    if (!this.isDisplayed) {
      setTimeout(() => {
        this.isDisplayed = true;
      });
    }
  }

  ngOnDestroy() {
    this.isDisplayed = false;
  }

}
