import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TUI_DATE_SEPARATOR } from '@taiga-ui/cdk';
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from '@taiga-ui/core';
import { TuiMobileCalendarDialogModule } from '@taiga-ui/addon-mobile';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { appFeatureKey, appReducer } from './store/reducers/app.reducer';
import * as userEffects from './store/effects/user.effects';
import * as userSettingsEffects from './store/effects/user-settings.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiMobileCalendarDialogModule,
    AppRoutingModule,
    StoreModule.forRoot({ [appFeatureKey]: appReducer }, {}),
    EffectsModule.forRoot(userEffects, userSettingsEffects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
    {
      provide: TUI_DATE_SEPARATOR,
      useValue: '/',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
