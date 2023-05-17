import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchPopupComponent } from './flight-search-popup.component';

describe('FlightSearchPopupComponent', () => {
  let component: FlightSearchPopupComponent;
  let fixture: ComponentFixture<FlightSearchPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightSearchPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSearchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
