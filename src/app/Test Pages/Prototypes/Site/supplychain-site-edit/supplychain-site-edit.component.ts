import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientModule } from '../../Client/client/client.module'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientsService } from '../../Client/clients.service';
import { SitesService } from '../sites.service';
import { SiteModule } from '../site/site.module';
import { StartupService } from 'src/startup.service';
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { PageHelpControlComponent } from 'fcid-metadata-lib';

@Component({
  selector: 'fcid-supplychain-site-edit',
  templateUrl: './supplychain-site-edit.component.html',
  styleUrls: ['./supplychain-site-edit.component.scss']
})
export class SupplychainSiteEditComponent implements OnInit {
  client: ClientModule;
  public site: SiteModule;
  originalSite: SiteModule;
  public siteAfterUpdate: SiteModule;
  public hasChanged: boolean;
  public updateSuccessful: boolean;
  siteSaved: boolean = false;
  private _serviceURL: string;
  HelpOpened: boolean = false;

  constructor(
    private startupConfig: StartupService,
    private route: ActivatedRoute,
    public router: Router,
    private clientService: ClientsService,
    private siteService: SitesService,
    private windowService: WindowService) { }

  public get serviceURL(): string {
    if (this._serviceURL && this._serviceURL != "")
      return this._serviceURL;

    if (this.startupConfig.startupData && this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT) {
      this._serviceURL = `https://foodchainidbusinessmetadata-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net/`;

      if (this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT == "Production") {
        this._serviceURL = `https://foodchainidbusinessmetadata20180918121456.azurewebsites.net/`;
      }
    }
  this._serviceURL='https://localhost:44339/'
    return this._serviceURL;
  }
  
  public siteEditForm = new FormGroup({
    locationTypeSet: new FormControl('', {
      validators: Validators.required
    }),
    siteName: new FormControl('', {
      validators: Validators.required
    }),
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
    siteId: new FormControl(0),
    siteStatusId: new FormControl(0),
    clientId: new FormControl(0),
    email: new FormControl(''),
    fax: new FormControl(''),
    deleted: new FormControl(false),
    geoLat: new FormControl(0),
    geoLng: new FormControl(0),
    sanctionReport: new FormControl(false),
    keyword: new FormControl(''),
    descr: new FormControl(''),
    contactId: new FormControl(0),
    formId: new FormControl(0),
    expedite: new FormControl(false),
    dateExpediteRequest: new FormControl(''),
    priority: new FormControl(false),

  });

  public countries: Array<{ text: string, value: string }> = [
    { text: "USA", value: "US" },
    { text: "United Kingdom", value: "GB" },
    { text: "Canada", value: "CA" },
    { text: "Brazil", value: "BR" },
    { text: "Mexico", value: "MX" },
  ];

  public clientId: number;
  public clientName: string = '';
  public siteId: number;
  public siteName: string = '';
  public serviceSubscription: Subscription;
  public savingText: string = 'Save';
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => this.clientId = + params.get('clientId'));
    this.route.paramMap.subscribe(params => this.siteId = + params.get('siteId'));
    this.serviceSubscription = this.clientService.fetchClient(this.clientId).subscribe((result) => {
      this.client = result;
      this.clientName = this.client.name;
    });

    this.serviceSubscription = this.siteService.fetchSite(this.siteId).subscribe((result) => {
      if (result == null) {
        this.router.navigate(['/accounts/' + this.clientId + '/sites/']);
      }
      this.site = result;
      this.originalSite = result;
      this.siteName = this.site.siteName;
      this.setFormValues(this.site);
      this.hasChanged = false;
  });

    this.siteEditForm.controls['siteName'].valueChanges.subscribe(
      (selectedValue) => {
        this.siteName = selectedValue;
      }
    );

    this.onchanges();
  }

  public onSave() {
    if (this.siteEditForm.dirty && this.siteEditForm.valid) {
      this.savingText = 'Saving...';
      this.siteAfterUpdate = Object.assign({}, this.siteEditForm.value);
      this.siteService.updateSite(this.siteId, this.originalSite, this.siteAfterUpdate).subscribe((res) => {
        this.siteAfterUpdate = res;
        this.siteEditForm.patchValue(this.siteAfterUpdate);
        this.savingText = 'Saved';
        this.hasChanged = false;
        this.siteSaved = true;
        this.siteName = this.siteAfterUpdate.siteName;
      });
    }
  }

  public onDelete() {
    this.siteAfterUpdate = Object.assign({}, this.siteEditForm.value);
    this.siteAfterUpdate.deleted = true;
    this.siteService.updateSite(this.siteId, this.originalSite, this.siteAfterUpdate).subscribe((res) => {
      this.router.navigate(['/accounts/' + this.clientId + '/sites/']);
    });
  }

  public setFormValues(site) {
    this.siteEditForm.reset({
      locationTypeSet: site.locationTypeSet,
      country: site.country,
      siteName: site.siteName,
      phone: site.phone,
      address1: site.address1,
      address2: site.address2,
      city: site.city,
      state: site.state,
      postalCode: site.postalCode,
      siteId: site.siteId,
      siteStatusId: site.siteStatusId,
      clientId: site.clientId,
      email: site.email,
      fax: site.fax,
      deleted: site.deleted,
      geoLat: site.geoLat,
      geoLng: site.geoLng,
      sanctionReport: site.sanctionReport,
      keyword: site.keyword,
      descr: site.descr,
      contactId: site.contactId,
      formId: site.formId,
      expedite: site.expedite,
      dateExpediteRequest: site.dateExpediteRequest,
      priority: site.priority
    });
    this.hasChanged = false;
  }

  public onUndo() {
    if(this.siteSaved)
    {
      this.setFormValues(this.siteAfterUpdate);
    }
    else
    {
      this.setFormValues(this.originalSite);
    }

    this.hasChanged = false;
  }

  onchanges(): void {
    this.siteEditForm.valueChanges.subscribe(val => {
      this.hasChanged = true;
      this.savingText = 'Save';
    })
  }

  public openPageHelpWindow() {
    
    const windowRef = this.windowService.open({
      title: 'Add Site',
      content: PageHelpControlComponent,
    });
    this.HelpOpened = true;

    windowRef.result.subscribe((result) => {
      if (result instanceof WindowCloseResult) {
        this.HelpOpened = false;
      }
    });
  }
}
