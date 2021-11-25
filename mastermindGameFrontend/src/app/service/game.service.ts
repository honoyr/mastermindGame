import {Injectable} from '@angular/core';
import {Status} from "../model/Status";
import {MatDialogData} from "../model/MatDialogData";
import {GameModel} from "../model/Game";

export interface Feedback {
  status: Status,
}

export interface Attempt {
  guessNumbers: Array<number>,
  feedbacks: Feedback[],
}

@Injectable({
  providedIn: 'root'
})
/**
 * Static class. Don't store any data. Works globally.
 */
export class GameService {

  /**
   * Create mock attempt based on game settings.
   * @param gameModel
   * @return Attempt
   */
  public static getMockAttempt(gameModel: GameModel): Attempt {
    const guessNumbers = new Array<number>(gameModel.gameSettings.requestedNumbers).fill(-2)
    const feedbacks: Feedback[] = GameService.createFeedbacks(guessNumbers, gameModel.randomNumbers);
    return {
      guessNumbers: guessNumbers,
      feedbacks: feedbacks,
    };
  }

  /**
   * Create player's attempt with feedbacks.
   * @param guessNumbers
   * @param randomNumbers
   * @return Attempt
   */
  public static createAttempt(guessNumbers: Array<number>, randomNumbers: Array<number>): Attempt {
    const feedbacks: Feedback[] = GameService.createFeedbacks(guessNumbers, randomNumbers);
    return {
      guessNumbers: guessNumbers,
      feedbacks: feedbacks
    };
  }

  /**
   * Return feedbacks for guessed numbers.
   * @param guessNumbers
   * @param randomNumbers
   * @private
   *
   */
  private static createFeedbacks(guessNumbers: Array<number>, randomNumbers: Array<number>): Feedback[] {
    let feedbacks: Feedback[] = [];
    const guessNumbersCopy: Array<number> = guessNumbers.map(number => number);
    const randomNumbersCopy: Array<number> = randomNumbers.map(number => number);

    for (let idx = 0; idx < guessNumbersCopy.length; idx++) {
      if (guessNumbersCopy[idx] === randomNumbersCopy[idx]) {
        feedbacks.push(GameService.createFeedback(guessNumbersCopy[idx], idx, randomNumbersCopy));
        guessNumbersCopy[idx] = Status.none;
        randomNumbersCopy[idx] = Status.none;
      }
    }
    for (let idx = 0; idx < guessNumbersCopy.length; idx++) {
      if (guessNumbersCopy[idx] !== Status.none) {
        feedbacks.push(GameService.createFeedback(guessNumbersCopy[idx], idx, randomNumbersCopy));
      }
    }
    feedbacks.sort((a, b) => b.status - a.status);
    return feedbacks;
  }

  /**
   * Return feedback for a guessed number.
   * @param guessNumbers
   * @param position
   * @param randomNumbers
   * @private
   */
  private static createFeedback(guessNumbers: number, position: number, randomNumbers: number[]): Feedback {
    let status: Status;
    const feedback: Feedback = {
      status: Status.none
    }

    if (guessNumbers === randomNumbers[position]) {
      status = Status.correctLocationAndNumber;
      GameService.preventDuplicates(guessNumbers, randomNumbers)
    } else if (randomNumbers.includes(guessNumbers)) {
      status = Status.correctNumber;
      GameService.preventDuplicates(guessNumbers, randomNumbers)
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
  private static preventDuplicates(guessNumber: number, randomNumbers: number[]): void {
    const indexOfGuessNumber = randomNumbers.indexOf(guessNumber);
    randomNumbers[indexOfGuessNumber] = Status.none;
  }

  /**
   * Checking if the game has ended.
   * @param gameModel
   */
  public static hasGameEnded(gameModel: GameModel): boolean {
    if (gameModel.attemptCounter === gameModel.gameSettings.numberOfAttempts) {
      gameModel.content = MatDialogData.noAttemptsLeft;
      gameModel.gameStatus = false;
      return true;
    } else if (GameService.isPositiveFeedback(gameModel.attempts[gameModel.attempts.length - 1])) {
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
  private static isPositiveFeedback(attempt: Attempt): boolean {
    return attempt.feedbacks.every(feedback => {
      return feedback.status === Status.correctLocationAndNumber
    });
  }

  /**
   * Reset game model
   * @param gameModel
   */
  public static resetGame(gameModel: GameModel): void {
    gameModel.randomNumbers = [];
    gameModel.gameStatus = true;
    gameModel.attempts = [];
    gameModel.attemptCounter = 0;
  }
}
