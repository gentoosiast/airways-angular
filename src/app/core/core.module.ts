import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import {
  TuiBadgedContentModule,
  TuiCheckboxLabeledModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputPasswordModule,
  TuiInputPhoneInternationalModule,
  TuiMarkerIconModule,
  TuiRadioBlockModule,
  TuiSelectModule,
  TuiSortCountriesPipeModule,
  TuiStringifyContentPipeModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TabbedFormsComponent } from './components/tabbed-forms/tabbed-forms.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SocialButtonsComponent } from './components/social-buttons/social-buttons.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CountPassengersPipe } from './pipes/count-passengers.pipe';
import { FlightSearchPopupComponent } from './components/flight-search-popup/flight-search-popup.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    NotFoundPageComponent,
    FooterComponent,
    HeaderComponent,
    ProgressBarComponent,
    TabbedFormsComponent,
    LoginFormComponent,
    SignupFormComponent,
    SocialButtonsComponent,
    CountPassengersPipe,
    FlightSearchPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    TuiLetModule,
    TuiButtonModule,
    TuiBadgedContentModule,
    TuiCheckboxLabeledModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiInputDateRangeModule,
    TuiInputPasswordModule,
    TuiInputPhoneInternationalModule,
    TuiLinkModule,
    TuiMarkerIconModule,
    TuiRadioBlockModule,
    TuiSelectModule,
    TuiSortCountriesPipeModule,
    TuiStringifyContentPipeModule,
    TuiSvgModule,
    TuiTabsModule,
    TuiTextfieldControllerModule,
  ],
  exports: [HeaderComponent, FooterComponent],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
