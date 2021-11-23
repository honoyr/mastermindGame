import {Injectable} from '@angular/core';
import {Status} from "../model/Status";
import {GameSettingsDto} from "../model/GameSettings";
import {MatDialogData} from "../model/MatDialogData";
import {GameModel, GameStateDto} from "../model/Game";
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

  public getMockAttempt(gameModel : GameModel) : Attempt {
    console.log("numberOfAttempts allowed = " + gameModel.gameSettings.requestedNumbers)
    const guessNumbers = new Array<number>(gameModel.gameSettings.requestedNumbers).fill(-2)
    const feedbacks: Feedback[] = this.createFeedbacks(guessNumbers, gameModel.randomNumbers);
    const mockAttempt: Attempt = {
      guessNumbers: guessNumbers,
      feedbacks: feedbacks,
    }
    return mockAttempt;
  }

  /**
   * Create player's attempt with feedbacks.
   */
  public createAttempt(guessNumbers: Array<number>, randomNumbers: Array<number>) : Attempt {
    const feedbacks: Feedback[] = this.createFeedbacks(guessNumbers, randomNumbers);
    const attempt: Attempt = {
      guessNumbers: guessNumbers,
      feedbacks: feedbacks,
    }
    return attempt;
  }

  /**
  * Return feedbacks for guessed numbers.
  */
  private createFeedbacks(guessNumbers: Array<number>, randomNumbers: Array<number>) : Feedback[] {
    let feedbacks: Feedback[] = [];
    const guessNumbersCopy: Array<number> = guessNumbers.map(number => number);
    const randomNumbersCopy: Array<number> = randomNumbers.map(number => number);

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
   * @param guessNumbers
   * @param position
   * @param randomNumbers
   * @private
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

  /**
   * Checking if the game has ended.
   * @param gameModel
   */
  public hasGameEnded(gameModel: GameModel) : boolean {
    if (gameModel.attemptsCounter === gameModel.gameSettings.numberOfAttempts){
      gameModel.content = MatDialogData.attemptsFull;
      gameModel.gameStatus = false;
      return true;
    } else if (this.isPositiveFeedback(gameModel.attempts[gameModel.attempts.length - 1])) {
      gameModel.content = MatDialogData.playerWon;
      gameModel.gameStatus = false;
      return true
    }
    return false;
  }

  /**
   * Checks the feedbacks for all guessed numbers.
   * @param attempt
   */
  private isPositiveFeedback(attempt: Attempt) : boolean {
    return attempt.feedbacks.every(feedback => {
      return feedback.status === Status.correctLocationAndNumber
    });
  }

  /**
   * Reset game model
   * @param gameModel
   */
  public resetGame(gameModel: GameModel) : void {
    gameModel.randomNumbers = [];
    gameModel.gameStatus = true;
    gameModel.attempts = [];
    gameModel.attemptsCounter = 0;
  }
}
