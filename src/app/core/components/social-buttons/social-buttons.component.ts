import { Component, EventEmitter, Output } from '@angular/core';
import { SocialData } from '@core/interfaces/social-data';
import { mockSocialData } from './mockSocialData';

@Component({
  selector: 'air-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.scss'],
})
export class SocialButtonsComponent {
  @Output() private facebookButtonClick = new EventEmitter<SocialData>();
  @Output() private googleButtonClick = new EventEmitter<SocialData>();

  onFacebookButtonClick() {
    this.facebookButtonClick.emit(mockSocialData);
  }

  onGoogleButtonClick() {
    this.googleButtonClick.emit(mockSocialData);
  }
}
