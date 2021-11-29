import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormComponent } from './input-form.component';

describe('InputFormComponent', () => {
  let component: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should crete form with guess control', () => {
    expect(component.formGroup.contains('guess')).toBeTruthy()
  });

  it('should mark guess control as invalid if empty value', () => {
    const control = component.guessControl.get('guess');
    control?.setValue('')
    expect(control?.valid).toBeFalsy();
  });

  it('should mark guess control as invalid if value contain any characters', () => {
    const control = component.guessControl.get('guess');
    control?.setValue('!@#$%^&*()привет')
    expect(control?.valid).toBeFalsy();
  });

  it('should mark guess control as invalid if value contain any characters', () => {
    const control = component.guessControl.get('guess');
    control?.setValue('4466')
    expect(control?.valid).toBeFalsy();
  });

  it('should mark guess control as invalid if the length of the input more than 4 digits.', () => {
    const control = component.guessControl.get('guess');
    control?.setValue('55555')
    expect(control?.valid).toBeFalsy();
  });

  it('should mark guess control as invalid if the length of the input less than 4 digits.', () => {
    const control = component.guessControl.get('guess');
    control?.setValue('555')
    expect(control?.valid).toBeFalsy();
  });

  it('should mark guess control as invalid if the length of the input more than 4 digits.', () => {
    const control = component.guessControl.get('guess');
    control?.setValue('5555')
    expect(control?.valid).toBeFalsy();
  });
  it('should mark guess control as invalid if the numbers out of range 0-7', () => {
    const control = component.guessControl.get('guess');
    control?.setValue('8888')
    expect(control?.valid).toBeFalsy();
  });
});
