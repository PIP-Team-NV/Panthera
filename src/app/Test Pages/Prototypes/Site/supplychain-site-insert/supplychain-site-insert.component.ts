import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WindowService, WindowCloseResult, WindowRef } from '@progress/kendo-angular-dialog';
import { ClientModule } from '../../Client/client/client.module'
import { Subscription } from 'rxjs/Subscription';
import { SitesService } from '../sites.service';
import { SiteModule } from '../site/site.module';
import { ActivatedRoute, Router } from '@angular/router';
import { StartupService } from 'src/startup.service';

@Component({
  selector: 'fcid-supplychain-site-insert',
  templateUrl: './supplychain-site-insert.component.html',
  styleUrls: ['./supplychain-site-insert.component.scss']
})
export class SupplychainSiteInsertComponent implements OnInit {

  private serviceSubscription: Subscription;
  private siteId: any;
  private site: SiteModule;
  private _serviceURL: string;

  public siteInsertForm = new FormGroup({
    locationTypeSet: new FormControl('', {
      validators: Validators.required
    }),
    siteName: new FormControl('', {
      validators: Validators.required
    }),
    siteId: new FormControl(''),
    phone: new FormControl('', {
      validators: [Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'), Validators.required]
    }),
    address1: new FormControl('', {
      validators: Validators.required
    }),
    address2: new FormControl('', {
    }),
    city: new FormControl('', {
      validators: Validators.required
    }),
    state: new FormControl('', {
      validators: Validators.required
    }),
    country: new FormControl('', {
      validators: Validators.required
    }),
    postalCode: new FormControl('', {
      validators: Validators.required
    }),
    clientId: new FormControl()
  });

  public countries: Array<{text: string, value: string}> = [
    {text: "USA", value: "US"},
    {text: "United Kingdom", value: "GB"},
    {text: "Canada", value: "CA"},
    {text: "Brazil", value: "BR"},
    {text: "Mexico", value: "MX"},
  ];

  public clientId: number;
  constructor(private startupConfig: StartupService,private windowRef:WindowRef, public siteService: SitesService, public router: Router, private route: ActivatedRoute) { }

  public get serviceURL(): string {
    if (this._serviceURL && this._serviceURL != "")
      return this._serviceURL;

    if (this.startupConfig.startupData && this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT) {
      this._serviceURL = `https://foodchainidbusinessmetadata-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net/`;

      if (this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT == "Production") {
        this._serviceURL = `https://foodchainidbusinessmetadata20180918121456.azurewebsites.net/`;
      }
    }

    return this._serviceURL;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.clientId = + params.get('clientId'));
    this.setFormDefaults();
  }

  public onSave(param: string) {
    if (this.siteInsertForm.valid) {
      const result: ClientModule = Object.assign({}, this.siteInsertForm.value)

      this.serviceSubscription = this.siteService.insertSite(this.siteInsertForm.value).subscribe((res) => {
          this.siteId = res;
          switch (param) {
            case "saveAndCon":
             this.router.navigate(['/accounts/' + this.clientId + '/sites/edit/' + this.siteId]);
              break;
            case "saveAndClose":
            this.onClose()
            break;
          case "saveAndAdd":
            this.setFormDefaults();
            break;
          default:
            this.setFormDefaults()
            break;
          }
        });
      }
    }

  public onClose(){
    this.windowRef.close();
  }

  public setFormDefaults() {
    this.siteInsertForm.reset({ locationTypeSet: [118281], country: "GB", clientId: this.clientId  });
  }
  public ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }
}
