import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryFlightCardComponent } from './summary-flight-card.component';

describe('SummaryFlightCardComponent', () => {
  let component: SummaryFlightCardComponent;
  let fixture: ComponentFixture<SummaryFlightCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryFlightCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryFlightCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
