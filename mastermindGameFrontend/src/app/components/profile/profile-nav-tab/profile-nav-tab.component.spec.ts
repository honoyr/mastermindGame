import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNavTabComponent } from './profile-nav-tab.component';

describe('ProfileNavTabComponent', () => {
  let component: ProfileNavTabComponent;
  let fixture: ComponentFixture<ProfileNavTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileNavTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNavTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
