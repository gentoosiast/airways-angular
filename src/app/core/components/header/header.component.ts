import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TuiDialogService, TuiAlertService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TabbedFormsComponent } from '../tabbed-forms/tabbed-forms.component';

@Component({
  selector: 'air-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  sub = new Subscription();

  constructor(private dialogs: TuiDialogService, private alertService: TuiAlertService) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openLoginModal() {
    this.sub.add(
      this.dialogs.open<boolean>(new PolymorpheusComponent(TabbedFormsComponent)).subscribe({
        next: () => {
          this.sub.add(this.alertService.open('Form has been submitted').subscribe());
        },
      }),
    );
  }
}
