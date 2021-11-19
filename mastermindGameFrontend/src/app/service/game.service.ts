import {Injectable} from '@angular/core';
import {Status} from "../model/Status";
import {GameSettingsDto} from "../model/GameSettings";
import {Messages} from "../model/Messages";
import {DialogData} from "../components/open-dialog/open-dialog.component";

export interface Feedback {
  status: Status,
}

export interface Attempt {
  guessNumbers: Array<number>,
  feedbacks:    Feedback[],
}


@Injectable()
export class GameService {
  private _randomNumbers:   Array<number> = [];
  private _guessNumbers:    Array<number> = [];
  private _attempts:        Array<Attempt> = [];

  private _gameSettings!:   GameSettingsDto;
  private _gameStatus:      boolean = true;
  private _turn:            number = 0;
  private _message!:         Messages;


  constructor() {
  }

  get randomNumbers(): Array<number> {
    return this._randomNumbers;
  }

  get gameStatus(): boolean {
    return this._gameStatus;
  }

  // get winnerStatus(): boolean {
  //   return this._winnerStatus;
  // }

  get attempts(): Array<Attempt> {
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
      this.preventDuplicates(guessNumbers, randomNumbers)
    } else if (randomNumbers.includes(guessNumbers)) {
      status = Status.correctNumber;
      this.preventDuplicates(guessNumbers, randomNumbers)
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
  private preventDuplicates (guessNumber: number, randomNumbers: number[]) {
    const indexOfGuessNumber = randomNumbers.indexOf(guessNumber);
    randomNumbers[indexOfGuessNumber] = Status.none;
  }

  hasGameEnded() {
    if (this.isNumberOfAttemptsFull()){
      this._message = Messages.attemptsFull;
      this._gameStatus = false;
      return true;
    } else if (this.isPositiveFeedback(this._attempts[this._attempts.length - 1])) {
      this._message = Messages.playerWon;
      this._gameStatus = false;
      return true
    }
    return false;
  }

  getMessage() {
    return this._message;
  }

  getDialogMessage() {
    if(this._message) {
      const dialogMessage: DialogData = {
        title: Messages.titleWinner,
        content: this._message,
        other: `Game was finished on ${this._attempts.length}th attempt.`
      };
      return dialogMessage;
    }
    return ;
  }


  isNumberOfAttemptsFull() {
    return this._attempts.length === this._gameSettings.numberOfAttempts;
  }

  isPositiveFeedback(attempt: Attempt) {
    return attempt.feedbacks.every(feedback => {
      return feedback.status === Status.correctLocationAndNumber
    });
  }

  // changeGameSettings(level) {
  //
  // }


  setSettings(gameSettings: GameSettingsDto, randomNumbers: Array<number>) {
    this._gameSettings = gameSettings;
    // this.getRandomNumbers();

    this._randomNumbers = randomNumbers;
    console.log("in game random number" + this._randomNumbers);
    this._gameStatus = true;
    this._attempts = [];
    this._turn = 0;
  }


  resetGame() {
    this._attempts = [];
  }



}
