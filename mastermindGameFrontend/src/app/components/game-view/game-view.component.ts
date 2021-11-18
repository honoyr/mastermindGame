import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, Observable, Subscription, throwError,} from "rxjs";
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
export class GameViewComponent implements OnInit, OnDestroy {

  mockAttempt$: Attempt = {
      guessNumbers: [-1, -1, -1, -1],
      feedbacks: [{status: -1}, {status: -1}, {status: -1}, {status: -1}]
  }

  gameSettingsDto!: GameSettingsDto;
  gameSettings = new GameSettings()
  error:any;
  loading!: boolean;
  randomNumbersSubscription!: Subscription;
  private message: string = '';

  constructor(public gameService: GameService,
              public integerGeneratorService: IntegerGeneratorService) {
    this.gameSettingsDto = this.gameSettings.changeSettings(Levels.medium);
  }

  newGame() {
    this.randomNumbersSubscription = this.integerGeneratorService.getNumbers(this.gameSettingsDto)
      .subscribe(randomNumbers => {
      this.gameService.setSettings(this.gameSettingsDto, randomNumbers);
    }, error => this.error = error)
    this.gameService.resetGame();
  }

  changeSettings(level:Levels) {
    this.gameSettingsDto = this.gameSettings.changeSettings(level);
  }

  createAttemptAndCheckWinner (guessNumberEventEmitter: any) {
    this.gameService.createAttempt(guessNumberEventEmitter);
    if (this.gameService.hasGameEnded()) {
      this.message = this.gameService.getMessage();
    }

  }


  // checkWinner() {
  //   this.gameService.checkWinner()
  //   this.gameService.turn++;
  // }
  // resetGame() {
  //
  // }

  ngOnInit(): void {
    console.log(this.gameSettings);
    this.newGame();
  }

  ngOnDestroy(): void {
    this.gameService.resetGame();
    this.randomNumbersSubscription.unsubscribe();
  }


}
