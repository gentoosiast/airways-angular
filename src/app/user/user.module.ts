import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiDataListModule, TuiHostedDropdownModule, TuiButtonModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TuiCheckboxModule } from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { UserRoutingModule } from './user-routing.module';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { UserAccountPageComponent } from './pages/user-account-page/user-account-page.component';
import { BookingsTableComponent } from './components/bookings-table/bookings-table.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ShoppingCartPageComponent, UserAccountPageComponent, BookingsTableComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiTableModule,
    TuiCheckboxModule,
    TuiLetModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiButtonModule,
    TuiScrollbarModule,
    SharedModule,
  ],
})
export class UserModule {}
