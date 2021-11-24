import {GameSettingsDto} from "./GameSettings";
import {Attempt} from "../service/game.service";
import {MatDialogData} from "./MatDialogData";

export class GameModel {
  private _randomNumbers:    Array<number> = [];
  private _guessNumbers:     Array<number> = [];
  private _attempts:         Array<Attempt> = [];
  private _mockAttempt!:      Attempt;

  private _attemptCounter:  number = 0;
  private _gameSettings!:    GameSettingsDto;
  private _gameStatus:       boolean = true;
  private _content!:         MatDialogData;

  get randomNumbers(): Array<number> {
    return this._randomNumbers;
  }

  set randomNumbers(value: Array<number>) {
    this._randomNumbers = value;
  }

  get guessNumbers(): Array<number> {
    return this._guessNumbers;
  }

  set guessNumbers(value: Array<number>) {
    this._guessNumbers = value;
  }

  get attempts(): Array<Attempt> {
    return this._attempts;
  }

  set attempts(value: Array<Attempt>) {
    this._attempts = value;
  }

  get attemptCounter(): number {
    return this._attemptCounter;
  }

  set attemptCounter(value: number) {
    this._attemptCounter = value;
  }

  get gameSettings(): GameSettingsDto {
    return this._gameSettings;
  }

  set gameSettings(value: GameSettingsDto) {
    this._gameSettings = value;
  }

  get gameStatus(): boolean {
    return this._gameStatus;
  }

  set gameStatus(value: boolean) {
    this._gameStatus = value;
  }

  get content(): MatDialogData {
    return this._content;
  }

  set content(value: MatDialogData) {
    this._content = value;
  }

  get mockAttempt(): Attempt {
    return this._mockAttempt;
  }

  set mockAttempt(value: Attempt) {
    this._mockAttempt = value;
  }

  getGameState() : GameStateDto {
    const gameState: GameStateDto = {
      gameSettings: this._gameSettings,
      randomNumbers: this._randomNumbers,
      gameStatus: this._gameStatus,
      attempts: this._attempts,
      numberOfAttempts: this._attemptCounter,
      content: this._content
    }
    return gameState
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
