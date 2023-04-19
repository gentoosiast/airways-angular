import { Component, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';

@Component({
  selector: 'air-tabbed-forms',
  templateUrl: './tabbed-forms.component.html',
  styleUrls: ['./tabbed-forms.component.scss'],
})
export class TabbedFormsComponent {
  activeTabIdx = 0;

  constructor(@Inject(POLYMORPHEUS_CONTEXT) private context: TuiDialogContext<boolean>) {}

  ok() {
    this.context.completeWith(true);
  }

  cancel() {
    this.context.completeWith(false);
  }

  onLoginFormSubmit() {
    this.ok();
  }

  onSignupFormSubmit() {
    this.ok();
  }
}
