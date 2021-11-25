import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { GameViewComponent } from './components/game-view/game-view.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { AttemptsListComponent } from './components/attempts-list/attempts-list.component';
import { AttemptCardComponent } from './components/attempt-card/attempt-card.component';
import { FeedbackCardComponent } from './components/feedback-card/feedback-card.component';
import { OpenDialogComponent } from './components/open-dialog/open-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../material.module";
import { InputFormNumberComponent } from './components/input-form-number/input-form-number.component';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    GameViewComponent,
    CountdownTimerComponent,
    InputFormComponent,
    AttemptsListComponent,
    AttemptCardComponent,
    FeedbackCardComponent,
    OpenDialogComponent,
    InputFormNumberComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent]
})
export class AppModule { }
