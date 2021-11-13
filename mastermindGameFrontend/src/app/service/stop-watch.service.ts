import { Injectable } from '@angular/core';
import {Observable, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StopWatchService {

  currentDate: Date = new Date();
  // timer$: Observable<Date>;

  date$: Observable<Date> = new Observable<Date>(obs => {
    setInterval(() => {
      obs.next(new Date())
    }, 100)
  })

  constructor() { }

  // getTimer(): Observable<number> {
  //  return  this.date$.subscribe( date => {
  //     setInterval(() => {
  //       this.timer$ = this.date$ - this.currentDate;
  //     }, 1000)
  //   })
  // }
}
