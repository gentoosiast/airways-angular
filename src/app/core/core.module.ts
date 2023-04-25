import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import {
  TuiButtonModule,
  TuiSvgModule,
  TUI_SANITIZER,
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiMarkerIconModule, TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotFoundPageComponent, FooterComponent, HeaderComponent, ProgressBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiMarkerIconModule,
    FormsModule,
    ReactiveFormsModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
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
