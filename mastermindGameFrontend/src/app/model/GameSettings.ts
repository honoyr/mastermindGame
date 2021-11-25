export enum Settings {
  EASY_NUM = 3,
  MEDIUM_NUM = 4,
  HARD_NUM = 5,

  MIN = 0,

  EASY_MAX = 5,
  MEDIUM_MAX = 7,
  HARD_MAX = 8,

  EASY_TIME = 600000,
  MEDIUM_TIME = 300000,
  HARD_TIME = 20000,

  EASY_NUMBER_OF_ATTEMPTS = 15,
  MEDIUM_NUMBER_OF_ATTEMPTS = 10,
  HARD_NUMBER_OF_ATTEMPTS = 5,
}

export interface GameSettingsDto {
  level: number;
  requestedNumbers: number;
  smallestValueReturned: number;
  largestValueReturned: number;
  numberOfAttempts: number;
}
