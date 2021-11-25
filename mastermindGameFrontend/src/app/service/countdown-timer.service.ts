import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CountdownTimerService {

  public currentDate = new Date();
  private milliSecondsInASecond = 1000;
  private hoursInADay = 24;
  private minutesInAnHour = 60;
  private secondsInAMinute = 60;

  public timeDifference!: number;
  public milliseconds!: number;
  public secondsToDday!: number;
  public minutesToDday!: number;
  public hoursToDday!: number;
  public daysToDday!: number;


  getTimeDifference(milliSeconds: number) {
    this.timeDifference = (this.currentDate.getTime() + milliSeconds) - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: number) {
    this.milliseconds = Math.floor(timeDifference % (this.milliSecondsInASecond));
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.secondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.secondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.secondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.secondsInAMinute * this.hoursInADay));
  }
}
