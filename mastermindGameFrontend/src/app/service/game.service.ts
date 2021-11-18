import {Injectable} from '@angular/core';
import {Status} from "../model/Status";
import {GameSettingsDto} from "../model/GameSettings";
import {IntegerGeneratorService} from "./integer-generator.service";

export interface Feedback {
  status: Status,
}

export interface Attempt {
  guessNumbers: Array<number>,
  feedbacks: Feedback[],
}


@Injectable()
export class GameService {

  private _randomNumbers: Array<number> = [];
  private _winner: boolean;
  private _attempts: Attempt[];
  private _guessNumbers: Array<number> = [];
  private _turn: number;
  private _gameSettings!: GameSettingsDto;

  constructor(private integerGenerator: IntegerGeneratorService) {
    this._winner = false;
    this._attempts = [];
    this._turn = 0;
  }

  get randomNumbers(): Array<number> {
    return this._randomNumbers;
  }

  get winner(): boolean {
    return this._winner;
  }

  get attempts(): Attempt[] {
    return this._attempts;
  }

  get guessNumbers(): Array<number> {
    return this._guessNumbers;
  }

  get turn(): number {
    return this._turn;
  }

  get gameSettings(): GameSettingsDto {
    return this._gameSettings;
  }


  /**
   * Create player's attempt with feedbacks.
   */
  createAttempt(guessNumbers: Array<number>) {
    const feedbacks: Feedback[] = this.createFeedbacks(guessNumbers);
    const attempt: Attempt = {
      guessNumbers: guessNumbers,
      feedbacks: feedbacks,
    }
    this.addAttemptToStack(attempt);
  }

  addAttemptToStack(attempt: Attempt) {
    this._attempts.push(attempt);
  }


  /**
  * Return feedbacks for guessed numbers.
  */

  private createFeedbacks(guessNumbers: Array<number>) {
    let feedbacks: Feedback[] = [];
    const guessNumbersCopy: Array<number> = guessNumbers.map(number => number);
    const randomNumbersCopy: Array<number> = this._randomNumbers.map(number => number);

    for(let idx = 0; idx < guessNumbersCopy.length; idx++){
      if (guessNumbersCopy[idx] === randomNumbersCopy[idx]) {
        feedbacks.push(this.createFeedback(guessNumbersCopy[idx], idx, randomNumbersCopy));
        guessNumbersCopy[idx] = Status.none;
        randomNumbersCopy[idx] = Status.none;
      }
    }
    for(let idx = 0; idx < guessNumbersCopy.length; idx++){
      if(guessNumbersCopy[idx] !== Status.none) {
        feedbacks.push(this.createFeedback(guessNumbersCopy[idx], idx, randomNumbersCopy));
      }
    }
    feedbacks.sort((a, b) =>  b.status - a.status);
    return feedbacks;
  }

  /**
  * Return feedback for a guessed number.
  */
  private createFeedback(guessNumbers: number, position: number, randomNumbers: number[]) {
    const feedback: Feedback = {
      status: Status.none
    }
    let status: Status;

    if(guessNumbers === randomNumbers[position]){
      status = Status.correctLocationAndNumber;
      this.preventDublicates(guessNumbers, randomNumbers)
    } else if (randomNumbers.includes(guessNumbers)) {
      status = Status.correctNumber;
      this.preventDublicates(guessNumbers, randomNumbers)
    } else {
      status = Status.incorrect;
    }
    feedback.status = status;
    return feedback;
  }

  /**
   * Preventive method from duplicate numbers in randomNumbers.
   * @param guessNumber
   * @param randomNumbers
   * @private
   */
  private preventDublicates (guessNumber: number, randomNumbers: number[]) {
    const indexOfGuessNumber = randomNumbers.indexOf(guessNumber);
    randomNumbers[indexOfGuessNumber] = Status.none;
  }

  checkTurn(attempt: Attempt) {
    if (this._turn === this._gameSettings.numberOfAttempts){
      this.checkWinner(attempt)
      return this._winner ? "player won the game" : "computer won game"
    } else {
      this.checkWinner(attempt)
      return this._winner ? "player won the game" : "not yet"
    }
    // this.turn++;
  }

  // private getRandomNumbers() {
  //   this.integerGenerator.getNumbers(this.gameSettings)
  //     .subscribe(randomNumbers => this.randomNumbers = randomNumbers);
  // }

  checkWinner(attempt: Attempt) {
    this._winner = attempt.feedbacks.every(feedback => feedback.status !== Status.correctLocationAndNumber);
  }

  // changeGameSettings(level) {
  //
  // }


  setSettings(gameSettings: GameSettingsDto, randomNumbers: Array<number>) {
    this._gameSettings = gameSettings;
    // this.getRandomNumbers();

    this._randomNumbers = randomNumbers;
    console.log("in game random number" + this._randomNumbers);
    this._winner = false;
    this._attempts = [];
    this._turn = 0;
  }


}
