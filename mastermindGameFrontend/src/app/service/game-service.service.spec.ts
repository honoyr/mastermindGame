import {TestBed} from '@angular/core/testing';

import {Attempt, GameService} from './game.service';
import {Status} from "../model/Status";
import {GameSettingsService} from "./game-settings.service";
import {Levels} from "../model/Levels";
import {GameModel} from "../model/Game";

describe('GameServiceService', () => {
  let service: GameService;

  const guessNumbersMatch: Array<number> =    [1,2,3,4];
  const guessNumbersNoMatch: Array<number> =  [5,4,3,2];
  const randomNumbers: Array<number> =        [1,2,3,4];

  const AttemptMatch: Attempt = {
    guessNumbers: [1, 2, 3, 4],
    feedbacks: [
      {status: Status.correctLocationAndNumber},
      {status: Status.correctLocationAndNumber},
      {status: Status.correctLocationAndNumber},
      {status: Status.correctLocationAndNumber}
    ]
  }

  const AttemptNoMatch: Attempt = {
    guessNumbers: [5, 2, 3, 4],
    feedbacks: [
      {status: Status.incorrect},
      {status: Status.correctNumber},
      {status: Status.correctLocationAndNumber},
      {status: Status.correctNumber}
    ]
  }

  const mockAttempt: Attempt = {
    guessNumbers: [-2, -2, -2, -2],
    feedbacks: [
      {status: Status.incorrect},
      {status: Status.incorrect},
      {status: Status.incorrect},
      {status: Status.incorrect}
    ]
  }

  const gameSettingsMedium = GameSettingsService.changeSettings(Levels.medium);

  const gameModel = new GameModel();

  gameModel.randomNumbers = randomNumbers;
  gameModel.gameSettings = gameSettingsMedium;
  gameModel.attempts.push(AttemptMatch);
  gameModel.mockAttempt = AttemptMatch


  beforeEach(() => {

    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create attempt on given guess numbers', () => {
    const attempt: Attempt = GameService.createAttempt(guessNumbersMatch, randomNumbers);
    expect(attempt).toBeDefined();
  })

  it('should create attempt on given guess numbers and be equal to mock attempt', () => {
    const attempt: Attempt = GameService.createAttempt(guessNumbersMatch, randomNumbers);
    expect(attempt).toEqual(AttemptMatch);
  })

  it('should create mock attempt on given gameSettings', () => {
    const attempt: Attempt = GameService.getMockAttempt(gameModel);
    expect(attempt).toEqual(mockAttempt);
  })

  it('should check if game has ended => true', () => {
    GameService.hasGameEnded(gameModel);
    expect(gameModel).toBeTruthy();
  })

  it('should reset randomNumbers in gameModel', () => {

    GameService.resetGame(gameModel);
    expect(gameModel.randomNumbers).toBe([]);
  })

  it('should reset gameStatus in gameModel', () => {

    GameService.resetGame(gameModel);
    expect(gameModel.gameStatus).toBe(true);
  })
  it('should reset attempts in gameModel', () => {

    GameService.resetGame(gameModel);
    expect(gameModel.attempts).toBe([]);
  })
  it('should reset attemptCounter in gameModel', () => {

    GameService.resetGame(gameModel);
    expect(gameModel.attemptCounter).toBe(0);
  })

});
