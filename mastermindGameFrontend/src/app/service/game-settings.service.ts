import { Injectable } from '@angular/core';
import {Levels} from "../model/Levels";
import {GameSettingsDto, Settings} from "../model/GameSettings";

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  private level!: Levels;
  private requestedNumbers!: number;
  private smallestValueReturned!: number;
  private largestValueReturned!: number;
  private numberOfAttempts!: number;
  private maxAttempts!:number;

  constructor() {
  }

  public changeSettings(level:Levels) {
    this.setSettings(level);
    return this.getSettings()
  }

  private setSettings(level: Levels){
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

  private getSettings() :GameSettingsDto {
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
