import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, Provider, SimpleChanges} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {GameSettingsDto, Settings} from "../../model/GameSettings";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnChanges {

  @Input()
  gameSettings$!: GameSettingsDto;

  @Input()
  gameStatus$!: boolean;

  @Output()
  attemptEventEmitter: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();

  min: string = Settings.MIN.toString();
  max: string = Settings.MEDIUM_MAX.toString();
  num: string = Settings.MEDIUM_NUM.toString();

  private numbersOnlyRegExp: RegExp = new RegExp(`^[0-9]*$`);
  private maxLengthRegExp: RegExp = new RegExp(`^.{0,${this.num}$`);
  private minLengthRegExp: RegExp = new RegExp(`^.{${this.num}}$`);
  private rangeRegExp: RegExp = new RegExp(`^[${this.min}-${this.max}]+$`);

  attempt!: Array<number>;

  guessControl: FormControl = new FormControl('', [
    this.regexValidator(this.maxLengthRegExp, {'maxLength': 'true'}),
    this.regexValidator(this.minLengthRegExp, {'minLength': 'true'}),
    this.regexValidator(this.rangeRegExp, {'range': 'true'}),
    this.regexValidator(this.numbersOnlyRegExp, {'numbersOnly': 'hjhj'}),
  ]);
  formGroup: FormGroup = new FormGroup({guess: this.guessControl});

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.min = this.gameSettings$.smallestValueReturned.toString();
    this.max = this.gameSettings$.largestValueReturned.toString();
    this.num = this.gameSettings$.requestedNumbers.toString();
    this.updateRegExp();
    this.initNewFormValidators();
  }

  private updateRegExp(): void {
    this.maxLengthRegExp = new RegExp(`^.{0,${this.num}}$`);
    this.minLengthRegExp = new RegExp(`^.{${this.num},}$`);
    this.rangeRegExp = new RegExp(`^[${this.min}-${this.max}]+$`);
  }

  private initNewFormValidators(): void {
    this.guessControl.setValidators([
      this.regexValidator(this.maxLengthRegExp, {'maxLength': 'true'}),
      this.regexValidator(this.minLengthRegExp, {'minLength': 'true'}),
      this.regexValidator(this.rangeRegExp, {'range': 'true'}),
      this.regexValidator(this.numbersOnlyRegExp, {'numbersOnly': 'hjhj'}),
    ])
  }

  submit() {
    const formData = {...this.formGroup.value};
    this.attempt = this.transform(formData.guess);
    this.attemptEventEmitter.emit(this.attempt);
    this.formGroup.reset();
  }

  transform(formData: string): Array<number> {
    let guessNumbers: number[] = [];
    for (let char of formData) {
      guessNumbers.push(Number(char));
    }
    return guessNumbers;
  }

  regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // @ts-ignore
        return null;
      }
      const valid = regex.test(control.value);
      // @ts-ignore
      return valid ? null : error;
    };
  }
}
