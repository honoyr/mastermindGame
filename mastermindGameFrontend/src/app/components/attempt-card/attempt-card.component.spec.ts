import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptCardComponent } from './attempt-card.component';

describe('AttemptCardComponent', () => {
  let component: AttemptCardComponent;
  let fixture: ComponentFixture<AttemptCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttemptCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
