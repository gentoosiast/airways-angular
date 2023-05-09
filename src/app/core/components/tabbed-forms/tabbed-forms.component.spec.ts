import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedFormsComponent } from './tabbed-forms.component';

describe('TabbedFormsComponent', () => {
  let component: TabbedFormsComponent;
  let fixture: ComponentFixture<TabbedFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabbedFormsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabbedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
