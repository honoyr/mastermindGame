import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Attempt, Feedback} from "../../service/game.service";

@Component({
  selector: 'app-attempts-list',
  templateUrl: './attempts-list.component.html',
  styleUrls: ['./attempts-list.component.scss']
})
export class AttemptsListComponent {

  @Input()
  attempts$!: Array<Attempt>;

  @Input()
  mockAttempt$!: Attempt;

  @Input()
  attemptCounter!: number;

  @Input()
  loading!: boolean;
}
