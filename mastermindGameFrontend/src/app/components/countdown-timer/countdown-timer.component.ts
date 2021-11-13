import { Component, OnInit } from '@angular/core';
import {interval, Subscription} from "rxjs";
import {CountdownTimerService} from "../../service/countdown-timer.service";
import {Settings} from "../../model/GameSettings";

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {
  private subscription!: Subscription;

  constructor(public countdownTimer: CountdownTimerService) {
  }

  ngOnInit() {
    this.subscription = interval(1000)
      .subscribe(x => { this.countdownTimer.getTimeDifference(Settings.EASY_TIME); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
