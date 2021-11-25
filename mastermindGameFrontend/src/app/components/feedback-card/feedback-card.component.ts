import {Component, Input, OnInit} from '@angular/core';
import {Feedback} from "../../service/game.service";

@Component({
  selector: 'app-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.scss']
})
export class FeedbackCardComponent {

  @Input()
  feedbacks$!: Feedback[]
}
