import { Component, Input, OnInit } from '@angular/core';
import { StartupService } from 'src/startup.service';
import { ActivatedRoute } from '@angular/router';
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { Subscription } from 'rxjs';
import { ClientsService } from '../../Client/clients.service';
import { SupplychainSiteInsertComponent } from '../supplychain-site-insert/supplychain-site-insert.component';
import { ClientModule } from '../../Client/client/client.module';

@Component({
  selector: 'fcid-supplychain-site-show',
  templateUrl: './supplychain-site-show.component.html',
  styleUrls: ['./supplychain-site-show.component.scss']
})
export class SupplychainSiteShowComponent implements OnInit {
  client: ClientModule;
  clientId: number;
  clientName: string;
  @Input('showHeader')
  showHeader: boolean = true;
   @Input('gridDomain')
   gridDomain: string = "supplychain.site";
   @Input('onShow')
   onShow: boolean = true;
   addSite: string = "";

  public siteOpened: boolean = false;
  currentRoute: string;
  serviceSubscription: Subscription;

  constructor(private route: ActivatedRoute,private windowService:WindowService, private startupConfig: StartupService, private clientService: ClientsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.clientId = + params.get('clientId'));

    if(this.showHeader)
    {
      this.serviceSubscription = this.clientService.fetchClient(this.clientId).subscribe((result) => {
        this.client = result;
        this.clientName = this.client.name;
      });
    }
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
      title: this.addSite,
      content:SupplychainSiteInsertComponent,
      width: 900,
      height: 650
    });
    this.siteOpened = true;

    windowRef.result.subscribe((result) => {
      if(result instanceof WindowCloseResult) {
        this.siteOpened = false;
      }
    });
  }

  onAddSiteTextCompleted(addSiteText: string) {
    this.addSite = addSiteText;
  } 
}
