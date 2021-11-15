import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  form!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      guess: new FormControl('',)
    })
  }

  submit() {
    console.log(this.form)
  }
}
