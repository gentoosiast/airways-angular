import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'air-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showProgressBar = false;

  currencyControl = new FormControl('USD');
  dateFormatControl = new FormControl('MM/DD/YY');

  currencies = ['USD', 'EUR', 'CHF', 'RUB'];
  dateFormats = ['MM/DD/YY', 'DD/MM/YY', 'YY/MM/DD'];

  constructor(private router: Router) {
    this.router.events.subscribe((value) => {
      if (!(value instanceof NavigationEnd)) return;
      if (['/booking/step-flights', '/booking/step-passengers', '/booking/step-summary'].includes(this.router.url)) {
        this.showProgressBar = true;
      } else {
        this.showProgressBar = false;
      }
    });
  }

  onSubmit() {
    console.log(`form submitted`);
  }
}
