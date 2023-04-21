import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [NotFoundPageComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, TuiButtonModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
