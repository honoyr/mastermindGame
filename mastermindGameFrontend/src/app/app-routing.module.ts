import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameViewComponent} from "./components/game-view/game-view.component";
import {InputFormComponent} from "./components/input-form/input-form.component";
import {InputFormNumberComponent} from "./components/input-form-number/input-form-number.component";

const routes: Routes = [
  {
    path: '',
    component: GameViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
