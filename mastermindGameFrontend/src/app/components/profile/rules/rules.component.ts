import { Component, OnInit } from '@angular/core';
import {Attempt, GameService} from "../../../service/game.service";
import {Status} from "../../../model/Status";

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent {

  attempt: Attempt = {
    guessNumbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    feedbacks: []
  }

  mock: Attempt = {
    guessNumbers: [],
    feedbacks: [
      {status: Status.correctLocationAndNumber},
      {status: Status.correctNumber},
      {status: Status.incorrect}
    ]
  }

  mockAttempt: Attempt = {
    guessNumbers: [1, 5, 3, 4],
    feedbacks: [
      {status: Status.incorrect},
      {status: Status.correctNumber},
      {status: Status.correctLocationAndNumber},
      {status: Status.correctNumber}
    ]
  }
}


