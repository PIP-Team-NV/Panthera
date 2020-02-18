import { Component, OnInit } from '@angular/core';
import { ClientModule } from '../Client/client/client.module';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StartupService } from 'src/startup.service';
import { ClientsService } from '../Client/clients.service';
import { MetadataServiceService } from 'src/app/services/metadata-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'test-fieldtemplate',
  templateUrl: './test-fieldtemplate.component.html',
  styleUrls: ['./test-fieldtemplate.component.scss']
})
export class TestFieldtemplateComponent implements OnInit {

  public client: ClientModule;
  public clientId: number = 0;
  public clientName: string = "";
  public clientAfterUpdate: ClientModule;
  filteredClientId: any;
  private serviceSubscription: Subscription;
  public hasChanged: boolean;
  public siteOpened: boolean = false;
  public clientOpened: boolean = false;
  singleProducts = [];
  multipleProducts = [];
  fieldDataValue = [];
  itemsSearch = [];

  imgObj = {
    "coreId": "../assets/images/check.png",
    "coreName": "this check image"
  };


  constructor(private route: ActivatedRoute, private startupConfig: StartupService, public clientService: ClientsService, private metadataService: MetadataServiceService) {
  }


  private _serviceURL: string;

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
  public savingText: string = 'Save';
  public clientEditForm = new FormGroup({
    id: new FormControl(''),
    dateAdded: new FormControl('', Validators.required),
    legalName: new FormControl(''),
    website: new FormControl(''),
    name: new FormControl(''),
    dateStatus: new FormControl(''),
    bMfr: new FormControl(''),
    bRet: new FormControl(''),
    bSup: new FormControl(''),
    bDst: new FormControl(''),
    bPublic: new FormControl(''),
    bTest: new FormControl(''),
    bNGPVisible: new FormControl(''),
    bPmtOnline: new FormControl(''),
    bPtnrMktg: new FormControl(''),
    bDeleted: new FormControl(''),
    bFCEUMktg: new FormControl(''),
    bLockedOut: new FormControl(''),
    billingContact: new FormControl(''),
    billingLocation: new FormControl(''),
    clientStatusId: new FormControl('0'),
    pcaSet: new FormControl(''),
    pmtDiscountId: new FormControl(''),
    pmtFeeScheduleId: new FormControl(''),
    pmtRemarkId: new FormControl(''),
    pmtStatusId: new FormControl(''),
    primaryRole: new FormControl(''),
    primaryContactId: new FormControl(''),
    locationId: new FormControl(''),
    Logo: new FormControl(''),
    firstName: new FormControl('', {
      validators: Validators.required
    }),
    Age: new FormControl('', {
      validators: Validators.required
    }),
    Salary: new FormControl('', {
      validators: Validators.required
    }),
    Hyperlink: new FormControl('', {
      validators: Validators.required
    }),
    URL: new FormControl('', {
      validators: Validators.required
    }),
    MultiSelect: new FormControl('', {
      validators: Validators.required
    }),
    TextArea: new FormControl('', {
      validators: Validators.required
    }),
    TextEditor: new FormControl('', {
      validators: Validators.required
    }),
    SingleFileUpload: new FormControl('', {
      validators: Validators.required
    }),
    MultipleFileUpload: new FormControl('', {
      validators: Validators.required
    }),
    DropDown: new FormControl('', {
      validators: Validators.required
    }),
    TextCombo: new FormControl('', {
      validators: Validators.required
    }),
    subcategory: new FormControl('', {
      validators: Validators.required
    }),
    description: new FormControl('', {
      validators: Validators.required
    }),
    Brand: new FormControl('', {
      validators: Validators.required
    }),
    UploadBrand: new FormControl('', {
      validators: Validators.required
    }),
    CoreCascade: new FormControl('', [Validators.required]),
    Ingr: new FormControl('', {}),
    Cascade: new FormControl('', [Validators.required]),
    CoreImg: new FormControl('', [Validators.required]),
    Checkbox: new FormControl(true, [Validators.required]),
    Boolean: new FormControl('true', [Validators.required]),
    DateTime: new FormControl(new Date(2000, 10, 10)),
    Flyout: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordRetype: new FormControl('', [Validators.required]),
    reminder: new FormControl('No')

  });

  
  ngOnInit() {

    this.route.paramMap.subscribe(params => this.filteredClientId = +params.get('clientId'));
    this.clientId = this.filteredClientId
    this.serviceSubscription = this.clientService.fetchClient(this.filteredClientId).subscribe((result) => {
      if (result == undefined || result == null) return;
      this.client = result;
      this.clientId = this.client.id;
      this.clientName = this.client.name;
      this.clientEditForm.patchValue(this.client);
      this.clientEditForm.controls['clientStatusId'].setValue(this.client.clientStatusId.toString());
      this.clientEditForm.controls['primaryRole'].setValue(this.client.primaryRole.toString());
      this.hasChanged = false;
    });

    this.metadataService.getSingleFileJSON().subscribe(data => {
      this.singleProducts = data["singleProducts"];
      this.multipleProducts = data["multipleProducts"];
    });

    this.clientEditForm.controls['name'].valueChanges.subscribe(
      (selectedValue) => {
        this.clientName = selectedValue;
        console.log("i m here")
      }
    );
    this.onchanges();
  }

  ngAfterViewInit() {
    // this.metadataService.getFlyoutFileJSON().subscribe(data => {
    //   debugger;
    //   this.fieldDataValue = data["defaultBredCrumbObj"];
    //   this.itemsSearch = data["itemsSearch"];
    // });
  }

  public onUpdate() {
    if (this.clientEditForm.dirty && this.clientEditForm.valid) {
      this.savingText = 'Saving...';

      this.clientAfterUpdate = Object.assign({}, this.clientEditForm.value);
      console.log(this.clientAfterUpdate);
      this.clientService.updateClient(this.clientId, this.client, this.clientAfterUpdate).subscribe((result) => {
        this.clientAfterUpdate = result;
        this.clientEditForm.patchValue(this.clientAfterUpdate);
        this.savingText = 'Saved';
        this.hasChanged = false;
      });

    }
  }

  public ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  public onCancel() {
    this.clientEditForm.patchValue(this.client);
    this.clientEditForm.controls['clientStatusId'].setValue(this.client.clientStatusId.toString());
    this.hasChanged = false;

  }

  onchanges(): void {
    this.clientEditForm.valueChanges.subscribe(val => {
      this.hasChanged = true;
      this.savingText = 'Save';
    })
  }
}
