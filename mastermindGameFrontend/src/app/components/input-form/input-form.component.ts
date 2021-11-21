import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, Provider, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {GameSettingsDto, Settings} from "../../model/GameSettings";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit, OnChanges {

  @Input()
  gameSettings$!: GameSettingsDto;

  @Input()
  gameStatus$!: boolean;

  @Output()
  attemptEventEmitter: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();

  form: FormGroup = new FormGroup({ guess: new FormControl('')}); // review this
  min: string;
  max: string;
  num: string;

  attempt!: Array<number>;

  constructor() {
    this.min = Settings.MIN.toString();
    this.max = Settings.MEDIUM_MAX.toString();
    this.num = Settings.MEDIUM_NUM.toString();
  }

  get guess() { return this.form.get('guess'); }

  ngOnChanges(changes: SimpleChanges): void {
    this.min = this.gameSettings$.smallestValueReturned.toString();
    this.max = this.gameSettings$.largestValueReturned.toString();
    this.num = this.gameSettings$.requestedNumbers.toString();
    let regex: string = `[${this.min}-${this.max}]{${this.num}}`
    this.initForm(regex);
  }

  transform(formData: string){
    let guessNumbers: number[] = [];
    for(let char of formData){
      guessNumbers.push(Number(char));
    }
    // console.log("Input");
    // console.log(guessNumbers);
    return guessNumbers;
  }

  submit() {
    const formData = {...this.form.value};
    this.attempt = this.transform(formData.guess);
    // console.log(this.attempt);
    this.attemptEventEmitter.emit(this.attempt);
    this.form.reset();
  }

  private initForm(regex: string) {
    this.form = new FormGroup({
      guess: new FormControl('',
        [
          Validators.pattern(regex),
          Validators.required,
        ]),
    })
  }

  ngOnInit(): void {
  }
}
