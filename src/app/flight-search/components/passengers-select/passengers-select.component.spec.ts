import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersSelectComponent } from './passengers-select.component';

describe('PassengersSelectComponent', () => {
  let component: PassengersSelectComponent;
  let fixture: ComponentFixture<PassengersSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassengersSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengersSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
