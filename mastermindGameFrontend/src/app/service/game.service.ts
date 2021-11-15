import {Injectable} from '@angular/core';
import {Status} from "../model/Status";
import {GameSettingsDto} from "../model/GameSettings";
import {IntegerGeneratorService} from "./integer-generator.service";

export interface Feedback {
  status: Status,
}

export interface Attempt {
  guessNumbers: [],
  feedbacks: Feedback[],
}


@Injectable()
export class GameService {

  randomNumbers!: number[];
  winner: boolean;
  attempts: Attempt[];
  turn: number;
  gameSettings!: GameSettingsDto;

  constructor(private integerGenerator: IntegerGeneratorService) {
    this.winner = false;
    this.attempts = [];
    this.turn = 0;
  }

  addAttemptToStack(attempt: Attempt) {
    this.attempts.push(attempt);
  }

  /**
   * Create player's attempt with feedbacks.
   */
  createAttempt(guessNumbers: []) {
    const feedbacks: Feedback[] = this.createFeedbacks(guessNumbers);
    const attempt: Attempt = {
      guessNumbers: guessNumbers,
      feedbacks: feedbacks,
    }
    this.addAttemptToStack(attempt);
    return attempt;
  }

  /**
  * Return feedback for guessed number.
  */

  private createFeedbacks(guessNumbers: []) {
    let feedbacks: Feedback[] = [];
    const randomNumbers: number[] = [...this.randomNumbers];

    for(let idx = 0; idx < guessNumbers.length - 1; idx++){
      feedbacks.push(this.createFeedback(guessNumbers[idx], idx, randomNumbers));
    }
    return feedbacks;
  }

  /**
  * Return feedback for guessed number.
  */
  private createFeedback(guessNumber: number, position: number, randomNumbers: number[]) {
    let status: Status;

    if(guessNumber === randomNumbers[position]){
      status = Status.correctLocationAndNumber;
    } else if (randomNumbers.includes(guessNumber)) {
      // include guessNumber in randomNumbers array
      // find it
      // delete from it or set to -1;
      status = Status.correctNumber;
      const indexOfGuessNumber = randomNumbers.indexOf(guessNumber);
      randomNumbers[indexOfGuessNumber] = Status.none; // preventive method from duplicate numbers in randomNumbers.
    } else {
      status = Status.incorrect;
    }
    const feedback: Feedback = {
      status: status
    }
    return feedback;
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


  setSettings(gameSettings: GameSettingsDto, randomNumbers: number[]) {
    this.gameSettings = gameSettings;
    // this.getRandomNumbers();

    this.randomNumbers = randomNumbers;
    this.winner = false;
    this.attempts = [];
    this.turn = 0;
  }
}
