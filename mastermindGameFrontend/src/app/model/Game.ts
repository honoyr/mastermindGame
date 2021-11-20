import {GameSettingsDto} from "./GameSettings";
import {Attempt} from "../service/game.service";
import {MatDialogData} from "./MatDialogData";

export class GameModel {

  gameSettings!: GameSettingsDto;
  randomNumbers!: Array<number>;
  attempts!: Attempt[];
  attempt!: Attempt;
  mockAttempt$!: Attempt;

  winnerStatus!: boolean;
  winner!: string;
  turns!: number;

  resetGameModel() {
    // this.gameSettings = []
    this.randomNumbers = []
    this.attempts = []

    this.winnerStatus = false;
    this.turns = 0;
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
