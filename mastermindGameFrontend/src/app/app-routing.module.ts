import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameViewComponent} from "./components/game-view/game-view.component";
import {RulesComponent} from "./components/profile/rules/rules.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',   redirectTo: 'game', pathMatch: 'full'
  },
  {
    path: 'game',
    component: GameViewComponent, data: { label: 'Game' }
  },
  {
    path: 'rules',
    component: RulesComponent, data: { label: 'Rules' }
  },
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
