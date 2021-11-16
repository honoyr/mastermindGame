import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptsListComponent } from './attempts-list.component';

describe('AttemptsListComponent', () => {
  let component: AttemptsListComponent;
  let fixture: ComponentFixture<AttemptsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttemptsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
