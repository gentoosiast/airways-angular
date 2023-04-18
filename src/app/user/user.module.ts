import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { UserAccountPageComponent } from './pages/user-account-page/user-account-page.component';

@NgModule({
  declarations: [ShoppingCartPageComponent, UserAccountPageComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
