import { Component, OnInit } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormArray, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'air-passengers-select',
  templateUrl: './passengers-select.component.html',
  styleUrls: ['./passengers-select.component.scss'],
})
export class PassengersSelectComponent implements OnInit {
  form!: FormArray;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control?.get('passengers') as FormArray;
    console.log(this.form);
  }
}
