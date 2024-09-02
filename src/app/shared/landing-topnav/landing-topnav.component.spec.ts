import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTopnavComponent } from './landing-topnav.component';

describe('LandingTopnavComponent', () => {
  let component: LandingTopnavComponent;
  let fixture: ComponentFixture<LandingTopnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingTopnavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingTopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
