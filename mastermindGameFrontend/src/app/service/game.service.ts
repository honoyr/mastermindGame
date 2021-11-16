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
  createAttempt(guessNumbers: Array<number>) {
    const feedbacks: Feedback[] = this.createFeedbacks(guessNumbers);
    const attempt: Attempt = {
      guessNumbers: guessNumbers,
      feedbacks: feedbacks,
    }
    this.addAttemptToStack(attempt);
    return attempt;
  }

  addAttemptToStack(attempt: Attempt) {
    this.attempts.push(attempt);
  }

  /**
  * Return feedback for guessed number.
  */

  private createFeedbacks(guessNumbers: Array<number>) {
    let feedbacks: Feedback[] = [];
    const randomNumbers: Array<number> = this.randomNumbers.map(number => number);

    for(let idx = 0; idx < guessNumbers.length; idx++){
      feedbacks.push(this.createFeedback(guessNumbers[idx], idx, randomNumbers));
    }
    return feedbacks;
  }

  /**
  * Return feedback for guessed number.
  */
  private createFeedback(guessNumbers: number, position: number, randomNumbers: number[]) {
    console.log('GuessNumb' + guessNumbers + ' position = ' + position);
    console.log('Rand' + randomNumbers)
    let status: Status;

    if(guessNumbers === randomNumbers[position]){
      status = Status.correctLocationAndNumber;
      this.preventDoublicats(guessNumbers, randomNumbers)
    } else if (randomNumbers.includes(guessNumbers)) {
      status = Status.correctNumber;
      this.preventDoublicats(guessNumbers, randomNumbers)
    } else {
      status = Status.incorrect;
    }
    const feedback: Feedback = {
      status: status
    }
    console.log(feedback);
    return feedback;
  }

  /**
   * Preventive method from duplicate numbers in randomNumbers.
   * @param guessNumber
   * @param randomNumbers
   * @private
   */
  private preventDoublicats (guessNumber: number, randomNumbers: number[]) {
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
