import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {map} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {GameSettings, GameSettingsDto} from "../model/GameSettings";


@Injectable({
  providedIn: 'root'
})
export class IntegerGeneratorService {

  constructor(private http: HttpClient) {
  }

  private static readonly COL       = '1';
  private static readonly BASE      = '10';
  private static readonly FORMAT    = 'plain'
  private static readonly RND       = 'new'

  private static readonly BASE_URL  = `&col=${IntegerGeneratorService.COL}`+
                                       `&base=${IntegerGeneratorService.BASE}`+
                                       `&format=${IntegerGeneratorService.FORMAT}`+
                                       `&rnd=${IntegerGeneratorService.RND}`


  getNumbers(gameSettings: GameSettingsDto): Observable<any> {
    const baseUrl = IntegerGeneratorService.BASE_URL;
    const settingsUrl = IntegerGeneratorService.parseToString(gameSettings);

    console.log(`${environment.api.host}${settingsUrl}${baseUrl}`);
    // @ts-ignore
    return this.http.get<ArrayBuffer>(`${environment.api.host}${settingsUrl}${baseUrl}`, {responseType: 'text'})
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
        map(data => {
          console.log(data)
          return data ? IntegerGeneratorService.parseNumber(data) : []
        })
      )
      ;
  }

  private static parseNumber(data: ArrayBuffer) {
    const numbers: number[] = [];
      data.toString().trim().split("\n").forEach(item => {
        numbers.push(Number(item));
    });
    return numbers;
  }

  private static parseToString(gameSettings: GameSettingsDto) {
    return  `?num=${gameSettings.requestedNumbers}`+
             `&min=${gameSettings.smallestValueReturned}`+
             `&max=${gameSettings.largestValueReturned}`
  }
}
