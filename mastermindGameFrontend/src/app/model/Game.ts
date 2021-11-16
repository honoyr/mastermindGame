import {GameSettingsDto} from "./GameSettings";
import {Attempt} from "../service/game.service";

export class GameModel {

  gameSettings!: GameSettingsDto;
  randomNumbers!: Array<number>;
  attempts!: Attempt[];

  winner!: boolean;
  turns!: number;

  resetGameModel() {
    // this.gameSettings = []
    this.randomNumbers = []
    this.attempts = []

    this.winner = false;
    this.turns = 0;
  }

}

export class GameModelDTO {

}
