import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GameSettingsDto} from "../../model/GameSettings";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {


  @Input()
  gameSettings$!: GameSettingsDto;

  form!: FormGroup;
  min: string = '1';
  max: string = '8'
  maxLen: string = '5'
  regex: string = `[${this.min}-${this.max}]{${this.maxLen}}`
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      guess: new FormControl('',
        [
                      // Validators.maxLength(4),
                      // Validators.minLength(4),
                      // Validators.max(7),
                      // Validators.min(0),
                      Validators.pattern(this.regex),
                      Validators.required,
                      ],  )
    })
  }

  get guess() { return this.form.get('guess'); }

  submit() {
    console.log(this.form)
    const formData = {...this.form.value};
    console.log(formData)
  }
}
