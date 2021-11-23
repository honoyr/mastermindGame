import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormNumberComponent } from './input-form-number.component';

describe('InputFormNumberComponent', () => {
  let component: InputFormNumberComponent;
  let fixture: ComponentFixture<InputFormNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFormNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
