import {Levels} from "./Levels";

export enum Settings {
  EASY_NUM = 3,
  MEDIUM_NUM = 4,
  HARD_NUM = 6,

  MIN = 0,

  EASY_MAX = 5,
  MEDIUM_MAX = 7,
  HARD_MAX = 9,

  EASY_TIME = Number.MAX_SAFE_INTEGER,
  MEDIUM_TIME = 600000,
  HARD_TIME = 20000,
}

export class GameSettings {
  public level!: Levels;
  public requestedNumbers!: number;
  public smallestValueReturned!: number;
  public largestValueReturned!: number;

  constructor(level?: Levels) {
    if(level) {
      this.level = level;
      this.setSettings(level);
    } else {
      this.setSettings(Levels.medium);
    }
  }

  setSettings(level: Levels){
    this.smallestValueReturned = Settings.MIN;

    switch ( level ) {
      case Levels.easy:
        this.requestedNumbers = Settings.EASY_NUM;
        this.largestValueReturned = Settings.EASY_MAX;
        break;
      case Levels.medium:
        this.requestedNumbers = Settings.MEDIUM_NUM;
        this.largestValueReturned = Settings.MEDIUM_MAX;
        break;
      case Levels.hard:
        this.requestedNumbers = Settings.HARD_NUM;
        this.largestValueReturned = Settings.HARD_MAX;
        break;
      default:
        this.requestedNumbers = Settings.MEDIUM_NUM;
        this.largestValueReturned = Settings.MEDIUM_MAX;
        break;
    }
  }

  getSettings() {
    const settings: GameSettingsDto = {
      level: this.level,
      requestedNumbers: this.requestedNumbers,
      smallestValueReturned: this.smallestValueReturned,
      largestValueReturned: this.largestValueReturned
    }
    return settings;
  }
}

export interface GameSettingsDto {
  level: number;
  requestedNumbers: number;
  smallestValueReturned: number;
  largestValueReturned: number;
}
