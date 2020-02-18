import { Directive, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { DataBindingDirective, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs/Subscription';
import { ChangeLogService } from './change-log.service';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[fcidChangeLogBinding]',
  providers: [ChangeLogService]
})
export class ChangeLogBindingDirective extends DataBindingDirective {
  private serviceSubscription: Subscription;
  private loadingFlag: number = 0;


  /**
    * The ChangeLogsBindingDirective constructor
    * @param changeLogs Injected changeLogService
    * @param grid Injected KendoUI GridComponenet
  
    */
  constructor(private changeLogs: ChangeLogService, grid: GridComponent, private route: ActivatedRoute) {
    super(grid);
    this.route.paramMap.subscribe(params => changeLogs.claimClientId = +params.get('id'));
  }

  /**
* This overrides the ngOnInit of the DataBindingDirective
* This method subscribes the serviceSubscrioption to the Injected ChnageLogService class, then calls the rebind method 
*/
  public ngOnInit(): void {
    this.loadingFlag = 0;

    this.serviceSubscription = this.changeLogs.subscribe((result) => {
      if (result == undefined || result == null) return;
      this.grid.loading = false;
      this.grid.data = result;
      this.notifyDataChange();
    });
    super.ngOnInit();
    this.rebind();
  }

  /**
 * This Disposes the resources hold by the serviceSubscription
 */
  public ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }
  /**
   * This method calls the Injected ChangeLogService query method.
   */
  public rebind(): void {
    this.grid.loading = true;
    this.changeLogs.query(this.state);
  }


}
