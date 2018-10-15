import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit, OnDestroy {
  isDisplayed = false;
  timer$ = timer(1500);
  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.isDisplayed = true;

    this.subscription = this.timer$.subscribe(() => {
      this.ngOnDestroy();
    });
  }

  ngOnDestroy() {
    this.isDisplayed = false;
    this.subscription.unsubscribe();
  }


}
