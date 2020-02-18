import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SecurityService } from './security.service';

@Directive({
  selector: '[fcidVisible]'
})
export class FcidVisibleDirective {
  private hasView = false;
  private _parms : string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private securityService: SecurityService) {
      // if (this.securityService.claims)
      // {
      //   this.fcidVisible = this.securityService.claims;
      // }
        

      // Subscribe to the tokenReceivedEvent. This is required else the visible controls will not update on login.
      this.securityService.tokenReceivedEvent.addListener(null, () => {
        // This will trigger a reassessment of the visibility on the control.
        this.fcidVisible = this._parms;
      });
    }

  @Input() set fcidVisible(parms: string) {
    this._parms = parms;
    var condition = this.securityService.checkPredicate(parms);
    if (condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

}