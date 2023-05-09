import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerContactsComponent } from './passenger-contacts.component';

describe('PassengerContactsComponent', () => {
  let component: PassengerContactsComponent;
  let fixture: ComponentFixture<PassengerContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassengerContactsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengerContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
