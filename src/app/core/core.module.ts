import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputDateModule,
  TuiInputPasswordModule,
  TuiInputPhoneInternationalModule,
  TuiMarkerIconModule,
  TuiRadioBlockModule,
  TuiSelectModule,
  TuiSortCountriesPipeModule,
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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TuiLetModule,
    TuiButtonModule,
    TuiCheckboxLabeledModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiInputPasswordModule,
    TuiInputPhoneInternationalModule,
    TuiLinkModule,
    TuiMarkerIconModule,
    TuiRadioBlockModule,
    TuiSelectModule,
    TuiSortCountriesPipeModule,
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
  ],
})
export class CoreModule {}
