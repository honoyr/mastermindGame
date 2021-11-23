import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription,} from "rxjs";
import {IntegerGeneratorService} from "../../service/integer-generator.service";
import {Levels} from "../../model/Levels"
import {GameSettings, GameSettingsDto} from "../../model/GameSettings";
import {Attempt, GameService} from "../../service/game.service";
import {OpenDialogComponent} from "../open-dialog/open-dialog.component";
import {MessageEnumId} from "../../model/MessageEnumId";
import {DialogData, MessageService} from "../../service/message.service";
import {GameModel} from "../../model/Game";

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
  providers: [GameService]
})
export class GameViewComponent implements OnInit, OnDestroy {

  gameSettings: GameSettings  = new GameSettings()
  gameModel:    GameModel     = new GameModel();
  error: any;
  loading: boolean = false;
  randomNumbersSubscription!: Subscription;
  dialogRefSubscription!:     Subscription;

  constructor(public dialog: MatDialog,
              public gameService: GameService,
              public messageService: MessageService,
              public integerGeneratorService: IntegerGeneratorService) {
    this.gameModel.gameSettings = this.gameSettings.changeSettings(Levels.medium);
  }

  newGame() : void {
    this.loading = true;
    this.gameService.resetGame(this.gameModel);
    this.randomNumbersSubscription = this.integerGeneratorService.getNumbers(this.gameModel.gameSettings)
      .subscribe(randomNumbers => {
        this.gameModel.randomNumbers = randomNumbers;
        this.gameModel.mockAttempt = this.gameService.getMockAttempt(this.gameModel);
        this.loading = false;
      }, error => this.error = error)
  }

  changeSettings(level: Levels) : void {
    const data: DialogData = this.messageService.getGameMessage(MessageEnumId.changeSettings, this.gameModel);

    const dialogRef = this.dialog.open(OpenDialogComponent, {data});
    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe((status: boolean) => {
        if (status) {
          this.gameModel.gameSettings = this.gameSettings.changeSettings(level);
          this.newGame();
        }
      })
  }

  createAttemptAndCheckWinner(guessNumberEventEmitter: any) : void {
    console.log(guessNumberEventEmitter);
    if (this.gameModel.gameStatus) {
      const attempt: Attempt = this.gameService.createAttempt(guessNumberEventEmitter, this.gameModel.randomNumbers)
      this.gameModel.attempts.push(attempt);
      this.gameModel.attemptsCounter++;
    }
    if (this.gameService.hasGameEnded(this.gameModel)) {
      this.openDialogWinnerMessage();
    }
  }

  openDialogWinnerMessage() : void {
    const data: DialogData = this.messageService.getGameMessage(MessageEnumId.winner, this.gameModel);
    const dialogRef = this.dialog.open(OpenDialogComponent, {data});
    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe((status: boolean) => {
        if (status) {
          this.newGame();
        }
      })
  }

  ngOnInit(): void {
    this.newGame();
  }

  ngOnDestroy(): void {
    this.gameService.resetGame(this.gameModel);
    this.dialogRefSubscription.unsubscribe();
    this.randomNumbersSubscription.unsubscribe();
  }
}
