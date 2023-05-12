import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '@core/pages/not-found-page/not-found-page.component';
import { authGuardFn } from '@user/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'flight-search',
    pathMatch: 'full',
  },
  {
    path: 'flight-search',
    loadChildren: () => import('@flight-search/flight-search.module').then((m) => m.FlightSearchModule),
  },
  {
    path: 'booking',
    loadChildren: () => import('@booking/booking.module').then((m) => m.BookingModule),
  },
  {
    path: 'user',
    loadChildren: () => import('@user/user.module').then((m) => m.UserModule),
    canMatch: [authGuardFn],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
