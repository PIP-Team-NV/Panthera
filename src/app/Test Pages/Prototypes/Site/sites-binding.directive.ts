import { Directive, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { DataBindingDirective, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs/Subscription';
import { SitesService } from './sites.service';

@Directive({
  selector: '[appSitesBinding]',
  providers: [SitesService]
})
/**
 * This typescript class deals with calling the SitesService and passing the result to the caller which is a kendo grid
 */
export class SitesBindingDirective extends DataBindingDirective {
  private serviceSubscription: Subscription;
  private loadingFlag: number = 0;
  /**
   * The ClientsBindingDirective constructor
   * @param sites Injected SitesService
   * @param grid Injected KendoUI GridComponenet
   * @param metadataservice Injected metdataService
   */
  constructor(private sites: SitesService, grid: GridComponent) {
    super(grid);
  }
  /**
   * This overrides the ngOnInit of the DataBindingDirective
   * This method subscribes the serviceSubscrioption to the Injected SitesService class, then calls the rebind method 
   */
  public ngOnInit(): void {
    this.loadingFlag = 0;
    this.serviceSubscription = this.sites.subscribe((result) => {
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
   * This method calls the Injected ClientService query method.
   */
  public rebind(): void {
    this.grid.loading = true;
    this.sites.query(this.state);
  }
}