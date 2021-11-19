import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, Provider, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {GameSettingsDto} from "../../model/GameSettings";

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

  form: FormGroup = new FormGroup({ guess: new FormControl('')});
  min!: string;
  max!: string;
  maxLen!: string;

  attempt!: Array<number>;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    this.min = this.gameSettings$.smallestValueReturned.toString();
    this.max = this.gameSettings$.largestValueReturned.toString();
    this.maxLen = this.gameSettings$.requestedNumbers.toString();
    let regex: string = `[${this.min}-${this.max}]{${this.maxLen}}`
    this.initForm(regex);
    // if (this.gameSettings$){
    //   initSettings(this.gameSettings$)
    // } esle {
    //   // default setting
    // }
    }

  ngOnInit(): void {
    console.log(this.gameSettings$);
  }

  get guess() { return this.form.get('guess'); }

  transform(formData: string){
    let guessNumbers: number[] = [];
    for(let char of formData){
      guessNumbers.push(Number(char));
    }
    console.log("Input");
    console.log(guessNumbers);
    return guessNumbers;
  }

  submit() {
    const formData = {...this.form.value};
    this.attempt = this.transform(formData.guess);
    console.log(this.attempt);
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

}
