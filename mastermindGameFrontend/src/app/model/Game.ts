import {GameSettingsDto} from "./GameSettings";
import {Attempt} from "../service/game.service";

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

export interface GameModelDto {
  winnerStatus: boolean;
  winner: string;

}
