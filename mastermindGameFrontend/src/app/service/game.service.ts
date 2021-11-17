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

  randomNumbers: Array<number> = [];
  winner: boolean;
  attempts: Attempt[];
  guessNumbers: Array<number> = [];
  turn: number;
  gameSettings!: GameSettingsDto;

  constructor(private integerGenerator: IntegerGeneratorService) {
    this.winner = false;
    this.attempts = [];
    this.turn = 0;
  }


  /**
   * Create player's attempt with feedbacks.
   */
  createAttempt(guessNumbersOriginal: Array<number>) {

    console.log("guessNumb Service" + guessNumbersOriginal);

    const randomNumbersCopy: Array<number> = this.randomNumbers.map(number => number);
    const guessNumbers: Array<number> = guessNumbersOriginal.map(number => number);
    const feedbacks: Feedback[] = this.createFeedbacks(guessNumbers, randomNumbersCopy);
    const attempt: Attempt = {
      guessNumbers: guessNumbersOriginal,
      feedbacks: feedbacks,
    }
    this.addAttemptToStack(attempt);
    return attempt;
  }

  addAttemptToStack(attempt: Attempt) {
    this.attempts.push(attempt);
  }


  /**
  * Return feedbacks of guessed numbers.
  */

  private createFeedbacks(guessNumbers: Array<number>, randomNumbersCopy: Array<number>) {
    let feedbacks: Feedback[] = [];

    for(let idx = 0; idx < guessNumbers.length; idx++){
      if (guessNumbers[idx] === randomNumbersCopy[idx]) {
        feedbacks.push(this.createFeedback(guessNumbers[idx], idx, randomNumbersCopy));
        guessNumbers[idx] = Status.none;
        randomNumbersCopy[idx] = Status.none;
      }
    }
    for(let idx = 0; idx < guessNumbers.length; idx++){
      if(guessNumbers[idx] !== Status.none) {
        feedbacks.push(this.createFeedback(guessNumbers[idx], idx, randomNumbersCopy));
      }
    }
    feedbacks.sort((a, b) =>  b.status - a.status);
    return feedbacks;
  }

  /**
  * Return feedback of guessed number.
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
    if (this.turn === this.gameSettings.numberOfAttempts){
      this.checkWinner(attempt)
      return this.winner ? "player won the game" : "computer won game"
    } else {
      this.checkWinner(attempt)
      return this.winner ? "player won the game" : "not yet"
    }
    this.turn++;
  }

  // private getRandomNumbers() {
  //   this.integerGenerator.getNumbers(this.gameSettings)
  //     .subscribe(randomNumbers => this.randomNumbers = randomNumbers);
  // }

  checkWinner(attempt: Attempt) {
    this.winner = attempt.feedbacks.every(feedback => feedback.status !== Status.correctLocationAndNumber);
  }

  // changeGameSettings(level) {
  //
  // }


  setSettings(gameSettings: GameSettingsDto, randomNumbers: Array<number>) {
    this.gameSettings = gameSettings;
    // this.getRandomNumbers();

    this.randomNumbers = randomNumbers;
    console.log("in game random number" + this.randomNumbers);
    this.winner = false;
    this.attempts = [];
    this.turn = 0;
  }


}
