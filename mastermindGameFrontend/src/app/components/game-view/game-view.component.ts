import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError, } from "rxjs";
import {map} from 'rxjs/operators';
import {IntegerGeneratorService} from "../../service/integer-generator.service";
import {Levels} from "../../model/Levels"
import {GameSettings, GameSettingsDto} from "../../model/GameSettings";
import {GameService} from "../../service/game.service";

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
  providers: [GameService]
})
export class GameViewComponent implements OnInit {

  numbers$: any;
  gameSettingsDto!: GameSettingsDto;
  gameSettings = new GameSettings()
  error:any;
  loading!: boolean;
  private game!: GameService;

  constructor(private gameService: GameService,
              public integerGeneratorService: IntegerGeneratorService) {
    this.gameSettings.setSettings(Levels.medium);

    this.gameSettingsDto = this.gameSettings.getSettings();
  }

  NewGame() {
    this.integerGeneratorService.getNumbers(this.gameSettingsDto)
      .subscribe(numb => this.numbers$ = numb, error => this.error = error)
    this.gameService.setSettings(this.gameSettingsDto, this.numbers$);
  }

  changeSettings(level:Levels) {

    this.gameSettings.setSettings(level);
    this.gameSettingsDto = this.gameSettings.getSettings();
    console.log(this.gameSettings);
  }

  ngOnInit(): void {
    // this.changeSettings(Levels.medium);
    console.log(this.gameSettings);
    this.integerGeneratorService.getNumbers(this.gameSettingsDto)
      .subscribe(numb => this.numbers$ = numb, error => this.error = error)
    // this.NewGame();
    // console.log(this.gameSettings.getSettings());
    // this.integerGenerator.getNumbers(this.gameSettings.getSettings())
    //   .subscribe(numb => this.numbers$ = numb, error => this.error = error)
    // console.log(this.numbers$);
  }



}
