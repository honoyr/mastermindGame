import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription,} from "rxjs";
import {IntegerGeneratorService} from "../../service/integer-generator.service";
import {Levels} from "../../model/Levels"
import {GameSettings, GameSettingsDto} from "../../model/GameSettings";
import {Attempt, GameService} from "../../service/game.service";
import {OpenDialogComponent} from "../open-dialog/open-dialog.component";
import {MessageEnumId} from "../../model/MessageEnumId";
import {DialogData} from "../../service/message.service";

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
  providers: [GameService]
})
export class GameViewComponent implements OnInit, OnDestroy {

  mockAttempt$!: Attempt;

  gameSettingsDto!: GameSettingsDto;
  gameSettings = new GameSettings()
  error: any;
  loading: boolean = false;
  randomNumbersSubscription!: Subscription;
  dialogRefSubscription!: Subscription;
  private message: string = '';

  constructor(public dialog: MatDialog,
              public gameService: GameService,
              public integerGeneratorService: IntegerGeneratorService) {
    this.gameSettingsDto = this.gameSettings.changeSettings(Levels.medium);
  }

  newGame() {
    this.loading = true;
    this.randomNumbersSubscription = this.integerGeneratorService.getNumbers(this.gameSettingsDto)
      .subscribe(randomNumbers => {
        this.gameService.setSettings(this.gameSettingsDto, randomNumbers);
        this.mockAttempt$ = this.gameService.getMockAttempt();
        this.loading = false;
      }, error => this.error = error)
    this.gameService.resetGame();
  }

  changeSettings(level: Levels) {
    const data: DialogData = this.gameService.getDialogMessage(MessageEnumId.changeSettings)

    // if (this.dialogRefSubscription){
    //   this.dialogRefSubscription.unsubscribe();
    // }

    const dialogRef = this.dialog.open(OpenDialogComponent, {data});
    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe((status: boolean) => {
        // console.log("Settings Status")
        // console.log(status);
        if (status) {
          this.gameSettingsDto = this.gameSettings.changeSettings(level);
          this.newGame();
        }
      })
  }

  createAttemptAndCheckWinner(guessNumberEventEmitter: any) {
    console.log(guessNumberEventEmitter);
    if (this.gameService.gameStatus) {
      this.gameService.createAttempt(guessNumberEventEmitter);
    }
    if (this.gameService.hasGameEnded()) {
      this.openDialogWinnerMessage();
    }
  }

  openDialogWinnerMessage() {
    const data = this.gameService.getDialogMessage(MessageEnumId.winner);

    // if (this.dialogRefSubscription){
    //   this.dialogRefSubscription.unsubscribe();
    // }
    const dialogRef = this.dialog.open(OpenDialogComponent, {data});
    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe((status: boolean) => {
        if (status) {
          this.newGame();
        }
      })
  }

  ngOnInit(): void {
    // console.log(this.gameSettings);
    this.newGame();
  }

  ngOnDestroy(): void {
    this.gameService.resetGame();
    this.dialogRefSubscription.unsubscribe();
    this.randomNumbersSubscription.unsubscribe();
  }


}
