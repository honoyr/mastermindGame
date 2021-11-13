import { Component, OnInit } from '@angular/core';
import {IntegerGeneratorService} from "../../service/integer-generator.service";
import {Levels} from "../../model/Levels"
import {GameSettings} from "../../model/GameSettings";
import {HttpClient, HttpHeaders, HttpParams,HttpParamsOptions } from "@angular/common/http";
import {map, tap} from 'rxjs/operators';
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

  numbers$: any;
  gameSettings: any = new GameSettings();
  error:any;
  loading!: boolean;

  constructor(private integerGenerator: IntegerGeneratorService,
              private http: HttpClient) {
    this.gameSettings.setSettings(Levels.hard);
  }

  ngOnInit(): void {
    console.log(this.gameSettings.getSettings());
    // this.numbers$ =
    // this.numbers = this.intGenerator.getNumbers(this.settings)
    // this.numbers$ = JSON.stringify(this.integerGenerator.getNumbers(this.gameSettings.getSettings()))
    // const options = {
    //   responseType: 'text' as const,
    // };
    // @ts-ignore
    this.http.get<any>(`https://www.random.org/integers/?num=6&min=1&max=9&col=1&base=10&format=plain&rnd=new`, {responseType: 'text'})
      .pipe(
        tap( // Log the result or error
          data => this.numbers$,
          error => this.error
        ),
        catchError( error => {
          console.log(error);
          this.loading = false;
          this.error = error.message;
          return throwError(error);
        }),
        map(number => {
          console.log(number);
        })
      )
      .subscribe( res => {
        map(res => {
          console.log("response");
          console.log(res);
        })
      })
    console.log("helo")
  }

}
