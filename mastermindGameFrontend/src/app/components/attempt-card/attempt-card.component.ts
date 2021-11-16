import {Component, Input, OnInit} from '@angular/core';
import {Attempt, Feedback} from "../../service/game.service";

@Component({
  selector: 'app-attempt-card',
  templateUrl: './attempt-card.component.html',
  styleUrls: ['./attempt-card.component.scss']
})
export class AttemptCardComponent implements OnInit {

  @Input()
  attempt$!: Attempt;

  constructor() { }

  ngOnInit(): void {
    this.attempt$ = {
      guessNumbers: [1, 3, 4, 5],
      feedbacks: [{status: 1}, {status: 1}, {status: 1}, {status: 1}],
    }
  }

}
