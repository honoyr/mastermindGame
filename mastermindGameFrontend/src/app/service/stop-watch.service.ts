import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StopWatchService {

  date: Observable<Date> = new Observable<Date>(obs => {
    setInterval(() => {
      obs.next(new Date())
    }, 100)
  })
  constructor() { }

}
