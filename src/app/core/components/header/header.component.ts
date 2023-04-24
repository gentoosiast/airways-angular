import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'air-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showProgressBar = false;

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
}
