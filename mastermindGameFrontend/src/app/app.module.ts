import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameViewComponent } from './components/game-view/game-view.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { AttemptsListComponent } from './components/attempts-list/attempts-list.component';
import { AttemptCardComponent } from './components/attempt-card/attempt-card.component';
import { FeedbackCardComponent } from './components/feedback-card/feedback-card.component';


@NgModule({
  declarations: [
    AppComponent,
    GameViewComponent,
    CountdownTimerComponent,
    InputFormComponent,
    AttemptsListComponent,
    AttemptCardComponent,
    FeedbackCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
