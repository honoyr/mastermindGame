import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError, } from "rxjs";
import {map} from 'rxjs/operators';
import {IntegerGeneratorService} from "../../service/integer-generator.service";
import {Levels} from "../../model/Levels"
import {GameSettings, GameSettingsDto} from "../../model/GameSettings";
import {Attempt, GameService} from "../../service/game.service";
// import {controlNameBinding} from "@angular/forms";

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
  providers: [GameService]
})
export class GameViewComponent implements OnInit {

  // randomNumber: number[];
  attempts$: Array<Attempt> = [];

  randomNumbers: Array<number> = [];
  attemptNumbers: Array<number> = [];
  gameSettingsDto!: GameSettingsDto;
  gameSettings = new GameSettings()
  error:any;
  loading!: boolean;
  private game!: GameService;

  constructor(private gameService: GameService,
              public integerGeneratorService: IntegerGeneratorService) {
    // this.gameSettings.setSettings(Levels.medium);
    // this.gameSettingsDto = this.gameSettings.getSettings();
    this.gameSettingsDto = this.gameSettings.changeSettings(Levels.medium);
  }

  newGame() {
    this.integerGeneratorService.getNumbers(this.gameSettingsDto)
      .subscribe(randomNumber => {
        this.randomNumbers = randomNumber;
        this.gameService.setSettings(this.gameSettingsDto, this.randomNumbers);
      }, error => this.error = error);
    // this.re
    // console.log("init Random Numb" + this.randomNumbers)

  }

  changeSettings(level:Levels) {
    this.gameSettingsDto = this.gameSettings.changeSettings(level);
  }

  ngOnInit(): void {
    console.log(this.gameSettings);
    this.newGame();
  }


  addAttempt(attemptEventEmitter: any) {
    this.attemptNumbers = attemptEventEmitter;
    this.attempts$.push(this.gameService.createAttempt(this.attemptNumbers));
    console.log(attemptEventEmitter);
  }
}
