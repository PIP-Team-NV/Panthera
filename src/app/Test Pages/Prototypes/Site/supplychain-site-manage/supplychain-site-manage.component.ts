import { StartupService } from 'src/startup.service';
import { Component, OnInit } from '@angular/core';
import { WindowService, WindowCloseResult, WindowRef } from '@progress/kendo-angular-dialog';
import { SupplychainSiteInsertComponent } from '../supplychain-site-insert/supplychain-site-insert.component';

@Component({
  selector: 'fcid-supplychain-site-manage',
  templateUrl: './supplychain-site-manage.component.html',
  styleUrls: ['./supplychain-site-manage.component.scss']
})
export class SupplychainSiteManageComponent implements OnInit {
  public siteOpened: boolean = false;
  
  constructor(private startupConfig: StartupService,
    private windowService:WindowService) { }

  ngOnInit() {
  }

  private _serviceURL: string;

  public get serviceURL() : string {
    if(this._serviceURL && this._serviceURL != "")
      return this._serviceURL;

    if (this.startupConfig.startupData && this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT)
    {
      this._serviceURL = `https://foodchainidbusinessmetadata-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net/`;

      if (this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT == "Production")
      {
      this._serviceURL = `https://foodchainidbusinessmetadata20180918121456.azurewebsites.net/`;
      }
    }
    
    return this._serviceURL;
  }

  public openSiteInsertWindow(){
    const windowRef = this.windowService.open({
      title: 'Add Site',
      content:SupplychainSiteInsertComponent,
    });
    this.siteOpened = true;

    windowRef.result.subscribe((result) => {
      if(result instanceof WindowCloseResult) {
        this.siteOpened = false;
      }
    });
  }
}
