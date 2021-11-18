import {Levels} from "./Levels";

export enum Settings {
  EASY_NUM = 3,
  MEDIUM_NUM = 4,
  HARD_NUM = 5,

  MIN = 0,

  EASY_MAX = 5,
  MEDIUM_MAX = 7,
  HARD_MAX = 8,

  EASY_TIME = 600000,
  MEDIUM_TIME = 300000,
  HARD_TIME = 20000,

  EASY_NUMBER_OF_ATTEMPTS = 15,
  MEDIUM_NUMBER_OF_ATTEMPTS = 10,
  HARD_NUMBER_OF_ATTEMPTS = 5
}

export class GameSettings {
  public level!: Levels;
  public requestedNumbers!: number;
  public smallestValueReturned!: number;
  public largestValueReturned!: number;
  public numberOfAttempts!: number;
  public maxAttempts!:number;

  constructor(level?: Levels) {
    if(level) {
      this.level = level;
      this.setSettings(level);
    } else {
      this.setSettings(Levels.medium);
    }
  }

  changeSettings(level:Levels) {
    this.setSettings(level);
    return this.getSettings()
  }

  setSettings(level: Levels){
    this.smallestValueReturned = Settings.MIN;
    this.level = level;

    switch ( level ) {
      case Levels.easy:
        this.requestedNumbers = Settings.EASY_NUM;
        this.largestValueReturned = Settings.EASY_MAX;
        this.numberOfAttempts = Settings.EASY_NUMBER_OF_ATTEMPTS;
        break;
      case Levels.medium:
        this.requestedNumbers = Settings.MEDIUM_NUM;
        this.largestValueReturned = Settings.MEDIUM_MAX;
        this.numberOfAttempts = Settings.MEDIUM_NUMBER_OF_ATTEMPTS;
        break;
      case Levels.hard:
        this.requestedNumbers = Settings.HARD_NUM;
        this.largestValueReturned = Settings.HARD_MAX;
        this.numberOfAttempts = Settings.HARD_NUMBER_OF_ATTEMPTS;
        break;
      default:
        this.requestedNumbers = Settings.MEDIUM_NUM;
        this.largestValueReturned = Settings.MEDIUM_MAX;
        this.numberOfAttempts = Settings.MEDIUM_NUMBER_OF_ATTEMPTS;
        break;
    }
  }

  getSettings() {
    const settings: GameSettingsDto = {
      level: this.level,
      requestedNumbers: this.requestedNumbers,
      smallestValueReturned: this.smallestValueReturned,
      largestValueReturned: this.largestValueReturned,
      numberOfAttempts: this.numberOfAttempts,
    }
    return settings;
  }
}

export interface GameSettingsDto {
  level: number;
  requestedNumbers: number;
  smallestValueReturned: number;
  largestValueReturned: number;
  numberOfAttempts: number;
}
