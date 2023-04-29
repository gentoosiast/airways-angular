import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { UserAccountPageComponent } from './pages/user-account-page/user-account-page.component';
import { BookingsTableComponent } from './components/bookings-table/bookings-table.component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiCheckboxModule, TuiInputTagModule, TuiInputModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiButtonModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ShoppingCartPageComponent, UserAccountPageComponent, BookingsTableComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    TuiTableModule,
    FormsModule,
    ReactiveFormsModule,
    TuiCheckboxModule,
    TuiInputTagModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiLetModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiButtonModule,
    SharedModule,
  ],
})
export class UserModule {}
