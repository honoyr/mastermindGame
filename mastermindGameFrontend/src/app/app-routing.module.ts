import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameViewComponent} from "./components/game-view/game-view.component";

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
