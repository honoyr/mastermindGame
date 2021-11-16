import {Component, Input, OnInit} from '@angular/core';
import {Attempt} from "../../service/game.service";

@Component({
  selector: 'app-attempts-list',
  templateUrl: './attempts-list.component.html',
  styleUrls: ['./attempts-list.component.scss']
})
export class AttemptsListComponent implements OnInit {

  @Input()
  attempts$!: Array<Attempt>;
  constructor() { }

  ngOnInit(): void {
  }

}
