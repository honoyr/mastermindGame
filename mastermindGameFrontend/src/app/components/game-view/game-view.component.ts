import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription,} from "rxjs";
import {IntegerGeneratorService} from "../../service/integer-generator.service";
import {Levels} from "../../model/Levels"
import {Attempt, GameService} from "../../service/game.service";
import {OpenDialogComponent} from "../open-dialog/open-dialog.component";
import {MessageEnumId} from "../../model/MessageEnumId";
import {DialogData, MessageService} from "../../service/message.service";
import {GameModel} from "../../model/Game";
import {GameSettingsService} from "../../service/game-settings.service";

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
  providers: [GameService]
})
export class GameViewComponent implements OnInit, OnDestroy {

  gameModel: GameModel = new GameModel();
  error: any;
  loading: boolean = false;
  randomNumbersSubscription!: Subscription;
  dialogRefSubscription!: Subscription;

  constructor(private dialog: MatDialog,
              private messageService: MessageService,
              private integerGeneratorService: IntegerGeneratorService) {
    this.gameModel.gameSettings = GameSettingsService.changeSettings(Levels.medium);
  }

  /**
   * Set up gameModel according to gameSettingsDto
   */
  newGame(): void {
    this.loading = true;
    GameService.resetGame(this.gameModel);
    this.randomNumbersSubscription = this.integerGeneratorService.getNumbers(this.gameModel.gameSettings)
      .subscribe(randomNumbers => {
        this.gameModel.randomNumbers = randomNumbers;
        this.createMockAttempt();
        this.loading = false;
      }, error => this.error = error)
  }

  /**
   * Create new gameSettingsDto for gameModel depending on the level chosen by user
   * @param level
   */
  changeSettings(level: Levels): void {
    const data: DialogData = this.messageService.getGameMessage(MessageEnumId.changeSettings, this.gameModel);

    const dialogRef = this.dialog.open(OpenDialogComponent, {data});
    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe((status: boolean) => {
        if (status) {
          this.gameModel.gameSettings = GameSettingsService.changeSettings(level);
          this.newGame();
        }
      })
  }

  /**
   * Create new attempt and check if the game has ended or if the game is still running.
   * User will be provided with a generated message according to gameModel state.
   * @param guessNumberEventEmitter
   */
  createAttemptAndCheckWinner(guessNumberEventEmitter: any): void {
    if (this.gameModel.gameStatus) {
      const attempt: Attempt = GameService.createAttempt(guessNumberEventEmitter, this.gameModel.randomNumbers)
      this.gameModel.attempts.push(attempt);
      this.gameModel.attemptCounter++;
    }
    if (GameService.hasGameEnded(this.gameModel)) {
      this.openDialogWinnerMessage();
    }
  }

  /**
   * Show a message in a modal window according to gameModel state
   */
  openDialogWinnerMessage(): void {
    const data: DialogData = this.messageService.getGameMessage(MessageEnumId.winner, this.gameModel);
    const dialogRef = this.dialog.open(OpenDialogComponent, {data});
    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe((status: boolean) => {
        if (status) {
          this.newGame();
        }
      })
  }

  /**
   * Create mockDataAttempt depending on gameSettingsDto
   */
  createMockAttempt(): void {
    if (!this.gameModel.mockAttempt ||
      this.gameModel.mockAttempt.guessNumbers.length !== this.gameModel.gameSettings.requestedNumbers) {
      this.gameModel.mockAttempt = GameService.getMockAttempt(this.gameModel);
    }
  }

  ngOnInit(): void {
    this.newGame();
  }

  ngOnDestroy(): void {
    GameService.resetGame(this.gameModel);
    this.randomNumbersSubscription.unsubscribe();
  }
}
