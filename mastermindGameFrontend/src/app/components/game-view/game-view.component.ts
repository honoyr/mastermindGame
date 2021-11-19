import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {catchError, Observable, Subscription, throwError,} from "rxjs";
import {map} from 'rxjs/operators';
import {IntegerGeneratorService} from "../../service/integer-generator.service";
import {Levels} from "../../model/Levels"
import {GameSettings, GameSettingsDto} from "../../model/GameSettings";
import {Attempt, GameService} from "../../service/game.service";
import {DialogData, OpenDialogComponent} from "../open-dialog/open-dialog.component";
import {Messages} from "../../model/Messages";
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
  dialogRefSubscription!: Subscription;
  private message: string = '';

  constructor(public dialog: MatDialog,
              public gameService: GameService,
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
    const data: DialogData = {
      title: Messages.titleWarning,
      content: Messages.changeSettings,
      other: ""
    }

    if (this.dialogRefSubscription){
      this.dialogRefSubscription.unsubscribe();
    }

    const dialogRef = this.dialog.open(OpenDialogComponent, {data});
    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe((status: boolean) => {
        console.log("Settings Status")
        console.log(status);
        if (status === true) {
          this.gameSettingsDto = this.gameSettings.changeSettings(level);
          this.newGame();
        }
      })
      // .unsubscribe();
  }

  createAttemptAndCheckWinner (guessNumberEventEmitter: any) {
    if(this.gameService.gameStatus){
      this.gameService.createAttempt(guessNumberEventEmitter);
    }
    if (this.gameService.hasGameEnded()) {
        this.openDialogWinnerMessage();
    }
  }

  openDialogWinnerMessage() {
    const data = this.gameService.getDialogMessage();

    if (this.dialogRefSubscription){
      this.dialogRefSubscription.unsubscribe();
    }
    // @ts-ignore
    const dialogRef = this.dialog.open(OpenDialogComponent, {data});
    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe((status: boolean) => {
        debugger
        console.log("Status");
        console.log(status)
        if (status === true) {
          this.newGame();
        }
      })
      // .unsubscribe();
  }

  // checkWinner() {
  //   this.gameService.checkWinner()
  //   this.gameService.turn++;
  // }
  // resetGame() {
  //
  // }

  // openDialog() {
  //   this.dialog.open(OpenDialogComponent);
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
