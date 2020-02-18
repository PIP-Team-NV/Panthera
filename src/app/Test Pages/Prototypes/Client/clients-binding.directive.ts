import { Directive, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { DataBindingDirective, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs/Subscription';
import { ClientsService } from './clients.service';


@Directive({
  selector: '[appClientsBinding]',
  providers: [ClientsService]

})
/**
 * This typescript class deals with calling the ClientService and passing the result to the caller which is a kendo grid
 */
export class ClientsBindingDirective extends DataBindingDirective {
  private serviceSubscription: Subscription;
  private loadingFlag: number = 0;
  /**
   * The ClientsBindingDirective constructor
   * @param clients Injected ClientsService
   * @param grid Injected KendoUI GridComponenet
   * @param metadaraservice Injected metdataService
   */
  constructor(private clients: ClientsService, grid: GridComponent) {
    super(grid);
  }
  /**
   * This overrides the ngOnInit of the DataBindingDirective
   * This method subscribes the serviceSubscrioption to the Injected ClientsService class, then calls the rebind method 
   */
  public ngOnInit(): void {
    this.loadingFlag = 0;

    this.serviceSubscription = this.clients.subscribe((result) => {
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
    this.clients.query(this.state);
  }
}
