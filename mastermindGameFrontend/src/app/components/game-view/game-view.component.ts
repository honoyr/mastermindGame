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

  // randomNumber: number[];
  attempts$: Array<Attempt> = [];
  mockAttempt$: Attempt = {
      guessNumbers: [-1, -1, -1, -1],
      feedbacks: [{status: -1}, {status: -1}, {status: -1}, {status: -1}]
  }

  randomNumbers: Array<number> = [];
  guessNumbers: Array<number> = [];
  gameSettingsDto!: GameSettingsDto;
  gameSettings = new GameSettings()
  error:any;
  loading!: boolean;
  intGen!: Observable<Array<number>>;
  private game!: GameService;
  randomNumbersSubscription!: Subscription;

  constructor(public gameService: GameService,
              public integerGeneratorService: IntegerGeneratorService) {
    this.gameSettingsDto = this.gameSettings.changeSettings(Levels.medium);
  }

  newGame() {
    this.intGen = this.integerGeneratorService.getNumbers(this.gameSettingsDto);
    this.randomNumbersSubscription = this.intGen.subscribe(randomNumbers => {
      this.randomNumbers = randomNumbers;
      this.gameService.setSettings(this.gameSettingsDto, this.randomNumbers);
    }, error => this.error = error)
    this.attempts$ = []; // reset game settings and data in the component.
  }

  changeSettings(level:Levels) {
    this.gameSettingsDto = this.gameSettings.changeSettings(level);
  }

  createAttemptAndCheckWinner (attemptEventEmitter: any) {
    this.createAttempt(attemptEventEmitter)
    this.gameService.checkWinner(attemptEventEmitter);

  }
  createAttempt(attemptEventEmitter: any) {
    this.guessNumbers = attemptEventEmitter;
    this.gameService.createAttempt(attemptEventEmitter);

    console.log(attemptEventEmitter);
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
    // this.mockAttempt$.push(this.gameService.createAttempt([0,0,0,0]));
    this.newGame();
  }

  ngOnDestroy(): void {
    this.attempts$ = [];
    this.randomNumbersSubscription.unsubscribe();
  }


}
