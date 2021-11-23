import {MessageEnumId} from "./MessageEnumId";
import {expressionType} from "@angular/compiler/src/output/output_ast";

export enum MatDialogData {
  titleWinner = "Winner",
  titleWarning = "Warning",
  playerWon = "Congrats! You won the game",
  computerWon = "Game over, try again",
  attemptsFull = "Game over. Your attempts to guess are over",
  changeSettings = "By applying the settings you will lose your progress",
  buttonApply = "Apply",
  buttonTryAgain = "Try again",

}

export interface MatDialog {
  [MessageEnumId.winner]: string;
}
