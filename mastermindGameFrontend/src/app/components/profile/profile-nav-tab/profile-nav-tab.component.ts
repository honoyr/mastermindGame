import { Component, OnInit } from '@angular/core';
import {MenuItem} from "../../../model/components/MenuItem";

@Component({
  selector: 'app-profile-nav-tab',
  templateUrl: './profile-nav-tab.component.html',
  styleUrls: ['./profile-nav-tab.component.scss']
})
export class ProfileNavTabComponent {

  links: MenuItem[] = [
    {
      path: 'game',
      label: 'Game'
    },
    {
      path: 'rules',
      label: 'Rules'
    }
  ];


}
