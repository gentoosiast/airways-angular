import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiErrorModule, TuiLinkModule, TuiSvgModule, TUI_SANITIZER } from '@taiga-ui/core';
import {
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputDateModule,
  TuiInputPasswordModule,
  TuiInputPhoneInternationalModule,
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

@NgModule({
  declarations: [
    NotFoundPageComponent,
    FooterComponent,
    HeaderComponent,
    TabbedFormsComponent,
    LoginFormComponent,
    SignupFormComponent,
    SocialButtonsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiCheckboxLabeledModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiInputPasswordModule,
    TuiInputPhoneInternationalModule,
    TuiLinkModule,
    TuiRadioBlockModule,
    TuiSelectModule,
    TuiSortCountriesPipeModule,
    TuiSvgModule,
    TuiTabsModule,
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
