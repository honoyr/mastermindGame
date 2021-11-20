import {Injectable} from '@angular/core';
import {Status} from "../model/Status";
import {GameSettingsDto} from "../model/GameSettings";
import {MatDialogData} from "../model/MatDialogData";
import {GameStateDto} from "../model/Game";
import {DialogData, MessageService} from "./message.service";
import {MessageEnumId} from "../model/MessageEnumId";

export interface Feedback {
  status: Status,
}

export interface Attempt {
  guessNumbers: Array<number>,
  feedbacks:    Feedback[],
}


@Injectable()
export class GameService {
  private _randomNumbers:     Array<number> = [];
  private _guessNumbers:      Array<number> = [];
  private _attempts:          Array<Attempt> = [];

  private _attemptsCounter:  number = 0;
  private _gameSettings!:     GameSettingsDto;
  private _gameStatus:        boolean = true;
  private _content!:          MatDialogData;

  constructor(public messageService: MessageService) {
  }

  get randomNumbers(): Array<number> {
    return this._randomNumbers;
  }

  get gameStatus(): boolean {
    return this._gameStatus;
  }

  get attempts(): Array<Attempt> {
    return this._attempts;
  }

  get guessNumbers(): Array<number> {
    return this._guessNumbers;
  }

  get attemptsCounter(): number {
    return this._attemptsCounter;
  }

  get gameSettings(): GameSettingsDto {
    return this._gameSettings;
  }

  getMockAttempt() : Attempt {
    console.log("numberOfAttempts allowed = " + this._gameSettings.requestedNumbers)
    const guessNumbers = new Array<number>(this._gameSettings.requestedNumbers).fill(-2)
    const feedbacks: Feedback[] = this.createFeedbacks(guessNumbers);
    const mockAttempt: Attempt = {
      guessNumbers: guessNumbers,
      feedbacks: feedbacks,
    }
    return mockAttempt;
  }

  /**
   * Create player's attempt with feedbacks.
   */
  createAttempt(guessNumbers: Array<number>) : void {
    const feedbacks: Feedback[] = this.createFeedbacks(guessNumbers);
    const attempt: Attempt = {
      guessNumbers: guessNumbers,
      feedbacks: feedbacks,
    }
    this._attemptsCounter++;
    this._attempts.push(attempt);
  }

  /**
  * Return feedbacks for guessed numbers.
  */
  private createFeedbacks(guessNumbers: Array<number>) : Feedback[] {
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
  private createFeedback(guessNumbers: number, position: number, randomNumbers: number[]) : Feedback {
    let status: Status;
    const feedback: Feedback = {
      status: Status.none
    }

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
  private preventDuplicates (guessNumber: number, randomNumbers: number[]) : void {
    const indexOfGuessNumber = randomNumbers.indexOf(guessNumber);
    randomNumbers[indexOfGuessNumber] = Status.none;
  }


  hasGameEnded() : boolean {
    if (this.isNumberOfAttemptsFull()){
      this._content = MatDialogData.attemptsFull;
      this._gameStatus = false;
      return true;
    } else if (this.isPositiveFeedback(this._attempts[this._attempts.length - 1])) {
      this._content = MatDialogData.playerWon;
      this._gameStatus = false;
      return true
    }
    return false;
  }

  getDialogMessage(messageId: MessageEnumId): DialogData {
    return this.messageService.getGameMessage(messageId, this.getGameState());
  }


  isNumberOfAttemptsFull() : boolean {
    return this._attempts.length === this._gameSettings.numberOfAttempts;
  }

  isPositiveFeedback(attempt: Attempt) : boolean {
    return attempt.feedbacks.every(feedback => {
      return feedback.status === Status.correctLocationAndNumber
    });
  }


  setSettings(gameSettings: GameSettingsDto, randomNumbers: Array<number>) : void {
    this._gameSettings = gameSettings;
    this._randomNumbers = randomNumbers;
    this._gameStatus = true;
    this._attempts = [];
    this._attemptsCounter = 0;
  }

  resetGame() : void {
    this._randomNumbers = [];
    this._gameStatus = true;
    this._attempts = [];
    this._attemptsCounter = 0;
  }

  getGameState() : GameStateDto {
    const gameState: GameStateDto = {
      gameSettings: this._gameSettings,
      randomNumbers: this._randomNumbers,
      gameStatus: this._gameStatus,
      attempts: this._attempts,
      numberOfAttempts: this._attemptsCounter,
      content: this._content
    }
    return gameState
  }

}
