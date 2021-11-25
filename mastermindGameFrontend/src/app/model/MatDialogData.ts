import {MessageEnumId} from "./MessageEnumId";

export enum MatDialogData {
  titleWinner = "Winner",
  titleWarning = "Warning",
  playerWon = "Congrats! You won the game",
  noAttemptsLeft = "Game over. You ran out of attempts",
  changeSettings = "By applying the settings you will lose your progress",
  buttonApply = "Apply",
  buttonTryAgain = "Try again",
}

export interface MatDialog {
  [MessageEnumId.winner]: string;
}
