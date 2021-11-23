import {GameSettingsDto} from "./GameSettings";
import {Attempt} from "../service/game.service";
import {MatDialogData} from "./MatDialogData";

export class GameModel {

  private randomNumbers:     Array<number> = [];
  private guessNumbers:      Array<number> = [];
  private attempts:          Array<Attempt> = [];

  private attemptsCounter:  number = 0;
  private gameSettings!:     GameSettingsDto;
  private gameStatus:        boolean = true;
  private content!:          MatDialogData;

  resetGameModel() {
    this.randomNumbers = [];
    this.gameStatus = true;
    this.attempts = [];
    this.attemptsCounter = 0;
  }



}

export interface GameStateDto {
  randomNumbers:    Array<number>,
  attempts:         Array<Attempt>,
  numberOfAttempts: number,
  gameSettings:     GameSettingsDto,
  gameStatus:       boolean,
  content:          MatDialogData
}
