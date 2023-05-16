import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUser } from '@store/actions/user.actions';

@Component({
  selector: 'air-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadUser());
  }
}
