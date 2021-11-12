import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {GameSettings, GameSettingsDto} from "../model/GameSettings";


function parseToString(settings: void) {

}

@Injectable({
  providedIn: 'root'
})
export class IntegerGeneratorService {

  constructor(protected http: HttpClient) {
  }

  private static readonly COL       = '1';
  private static readonly BASE      = '10';
  private static readonly FORMAT    = 'plain'
  private static readonly RND       = 'new'

  private static readonly BASE_URL  = `&col=${IntegerGeneratorService.COL}
                                       &base=${IntegerGeneratorService.BASE}
                                       &format=${IntegerGeneratorService.FORMAT}
                                       &rnd=${IntegerGeneratorService.RND}`


  getNumbers(gameSettings: GameSettingsDto): Observable<Object> {
    const baseUrl = IntegerGeneratorService.BASE_URL;
    const settingsUrl = IntegerGeneratorService.parseToString(gameSettings);

    return this.http.get(`${environment.api.host}${settingsUrl}${baseUrl}`)
      .pipe(
      map(data => data ? IntegerGeneratorService.parseNumber(data) : {})
    );
  }

  private static parseNumber(data: Object) {
    console.log(data);
    return data;
  }

  private static parseToString(settings: GameSettingsDto) {
    return  `?num=${settings.requestedNumbers}
             &min=${settings.smallestValueReturned}
             &max=${settings.largestValueReturned}`
  }
}
