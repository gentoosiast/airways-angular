import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '@core/models/user.model';
import { mockSocialData } from './mockSocialData';

@Component({
  selector: 'air-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.scss'],
})
export class SocialButtonsComponent {
  @Output() private facebookButtonClick = new EventEmitter<User>();
  @Output() private googleButtonClick = new EventEmitter<User>();

  onFacebookButtonClick() {
    this.facebookButtonClick.emit(mockSocialData);
  }

  onGoogleButtonClick() {
    this.googleButtonClick.emit(mockSocialData);
  }
}
