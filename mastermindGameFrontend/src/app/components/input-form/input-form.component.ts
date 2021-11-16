import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, Provider, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {GameSettingsDto} from "../../model/GameSettings";

// const VALUE_ACCESSOR: Provider = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => InputFormComponent),
//   multi: true
// }

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit, OnChanges, ControlValueAccessor {


  @Input()
  gameSettings$!: GameSettingsDto;

  // @Output()
  // guessNumbers$: Array<number>;

  @Output() attemptEventEmitter: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();


  form!: FormGroup;
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
    }

  ngOnInit(): void {


    console.log(this.maxLen)
  }

  get guess() { return this.form.get('guess'); }

  transform(formData: string){
    let guessNumber: number[] = [];
    // formData.forEach((char:any) => guessNumber.push(Number(char)));
    for(let char of formData){
      guessNumber.push(Number(char));
    }
    return guessNumber;
  }

  submit() {
    const formData = {...this.form.value};
    this.attempt = this.transform(formData.guess);
    console.log(this.attempt);
    // this.min = this.gameSettings$.smallestValueReturned.toString();
    // this.max = this.gameSettings$.largestValueReturned.toString();
    // this.maxLen = this.gameSettings$.requestedNumbers.toString();
    this.attemptEventEmitter.emit(this.attempt);
    this.form.reset();
  }

  private initForm(regex: string) {
    this.form = new FormGroup({
      guess: new FormControl('',
        [
          // Validators.maxLength(4),
          // Validators.minLength(4),
          // Validators.max(7),
          // Validators.min(0),
          Validators.pattern(regex),
          Validators.required,
        ]),
    })
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }
}
