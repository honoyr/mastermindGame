import { Component, } from '@angular/core';
import {CommonModule} from "@angular/common";
import {StopWatchService} from "./service/stop-watch.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
  }
  title = 'mastermindGameFrontend';
}
