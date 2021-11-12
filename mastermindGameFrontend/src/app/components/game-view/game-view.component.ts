import { Component, OnInit } from '@angular/core';
import {IntegerGeneratorService} from "../../service/integer-generator.service";
import {Levels} from "../../model/Levels"
import {GameSettings} from "../../model/GameSettings";

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

  numbers: any;
  settings: any;

  constructor(private intGenerator: IntegerGeneratorService,
              private gameSettings: GameSettings) {
    this.gameSettings.setSettings(Levels.medium);
    this.settings = this.gameSettings.getSettings();
  }

  ngOnInit(): void {
    this.numbers = this.intGenerator.getNumbers(this.settings)
  }

}
