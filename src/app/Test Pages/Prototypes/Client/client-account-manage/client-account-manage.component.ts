import { Component, OnInit } from '@angular/core';
import { StartupService } from 'src/startup.service';
import { WindowService, WindowCloseResult, WindowRef } from '@progress/kendo-angular-dialog';
import { ClientAccountInsertComponent } from '../client-account-insert/client-account-insert.component';
import { SupplychainSiteInsertComponent } from '../../Site/supplychain-site-insert/supplychain-site-insert.component';

@Component({
  selector: 'fcid-client-account-manage',
  templateUrl: './client-account-manage.component.html',
  styleUrls: ['./client-account-manage.component.scss']
})
export class ClientAccountManageComponent implements OnInit {

  public siteOpened: boolean = false;
  public clientOpened: boolean = false;
  imgObj = {
    "coreId": "../assets/images/check.png",
    "coreName": "this check image"
  }

  constructor(private startupConfig: StartupService,
    private windowService: WindowService) { }

  ngOnInit() {
  }

  private _serviceURL: string;

  public get serviceURL(): string {
    if (this._serviceURL && this._serviceURL != "")
      return this._serviceURL;

    if (this.startupConfig.startupData && this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT) {
      this._serviceURL = `https://foodchainidbusinessmetadata-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net/`;

      if (this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT == "Production") {
        this._serviceURL = `https://foodchainidbusinessmetadata-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net/`;
      }
    }
    return this._serviceURL;
  }

  public openClientInsertWindow() {
    const windowRef = this.windowService.open({
      title: 'Add Client',
      content: ClientAccountInsertComponent,
    });
    this.clientOpened = true;
    windowRef.result.subscribe((result) => {
      if (result instanceof WindowCloseResult) {
        this.clientOpened = false;
      }
    });
  }

  public openSiteInsertWindow() {
    const windowRef = this.windowService.open({
      title: 'Add Site',
      content: SupplychainSiteInsertComponent,
    });
    this.siteOpened = true;

    windowRef.result.subscribe((result) => {
      if (result instanceof WindowCloseResult) {
        this.siteOpened = false;
      }
    });
  }
}

//For demo purpose we have added below code
//import { Component, OnInit } from '@angular/core';
//import { StartupService } from 'src/startup.service';
//import { WindowService, WindowCloseResult, WindowRef } from '@progress/kendo-angular-dialog';
//import { ClientAccountInsertComponent } from '../client-account-insert/client-account-insert.component';
//import { SupplychainSiteInsertComponent } from '../../Site/supplychain-site-insert/supplychain-site-insert.component';
//import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
//import { MetadataServiceService } from 'src/app/services/metadata-service.service';

//@Component({
//  selector: 'fcid-client-account-manage',
//  templateUrl: './client-account-manage.component.html',
//  styleUrls: ['./client-account-manage.component.scss']
//})
//export class ClientAccountManageComponent implements OnInit {

//  public siteOpened: boolean = false;
//  public clientOpened: boolean = false;
//  public clientEditForm: FormGroup;
  // singleProducts = [];
  // multipleProducts = [];
  // fieldDataValue = [];
  // itemsSearch = [];

//  imgObj = {
//    "coreId": "../assets/images/check.png",
//    "coreName": "this check image"
//  };

//  constructor(private startupConfig: StartupService,
//    private fb: FormBuilder,
//    private metadataService: MetadataServiceService,
//    private windowService: WindowService) { }

//  ngOnInit() {

//    this.metadataService.getSingleFileJSON().subscribe(data => {
//      this.singleProducts = data["singleProducts"];
//      this.multipleProducts = data["multipleProducts"];
//    });

//    this.clientEditForm = this.fb.group({
//      FirstName: new FormControl('', {
//        validators: Validators.required
//      }),
//      Age: new FormControl('', {
//        //validators: Validators.required
//      }),
//      Salary: new FormControl('', {
//        //validators: Validators.required
//      }),
//      Hyperlink: new FormControl('', {
//        // validators: Validators.required
//      }),
//      URL: new FormControl('', {
//        //validators: Validators.required
//      }),
//      MultiSelect: new FormControl('', {
//        // validators: Validators.required
//      }),
//      TextArea: new FormControl('', {
//        // validators: Validators.required
//      }),
//      TextEditor: new FormControl('', {
//        validators: Validators.required
//      }),
//      SingleFileUpload: new FormControl('', {
//        //validators: Validators.required
//      }),
//      MultipleFileUpload: new FormControl('', {
//        //validators: Validators.required
//      }),
//      DropDown: new FormControl('', {
//        //validators: Validators.required
//      }),
//      TextCombo: new FormControl('', {
//        //validators: Validators.required
//      }),
//      subcategory: new FormControl('', {
//        //validators: Validators.required
//      }),
//      description: new FormControl('', {
//        //validators: Validators.required
//      }),

//      Brand: ['', [Validators.required]],
//      UploadBrand: ['', [Validators.required]],
//      CoreCascade: new FormControl('', [Validators.required]),
//      Ingr: new FormControl('', {}),
//      Cascade: new FormControl('', [Validators.required]),
//         CoreImg: new FormControl('', [Validators.required]),
//         Checkbox: new FormControl(true, [Validators.required]),
//         Boolean: new FormControl('true', [Validators.required]),
//         DateTime: new FormControl(new Date(2000, 10, 10)),
//         Flyout: new FormControl('', [Validators.required]),
//      password: new FormControl('', [Validators.required]),
//      passwordRetype: new FormControl('', [Validators.required])
//    }
//    );
//  }

// ngAfterViewInit() {
//   this.metadataService.getFlyoutFileJSON().subscribe(data => {
//     debugger;
//     this.fieldDataValue = data["defaultBredCrumbObj"];
//     this.itemsSearch = data["itemsSearch"];
//   });
// }


//  get password() {
//    return this.clientEditForm.get('password');
//  }

//  get passwordRetype() {
//    return this.clientEditForm.get('passwordRetype');
//  }

//  private _serviceURL: string;

//  public get serviceURL(): string {
//    if (this._serviceURL && this._serviceURL != "")
//      return this._serviceURL;

//    if (this.startupConfig.startupData && this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT) {
//      this._serviceURL = `https://foodchainidbusinessmetadata-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net/`;

//      if (this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT == "Production") {
//        this._serviceURL = `https://foodchainidbusinessmetadata-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net/`;
//      }
//    }

//    return this._serviceURL;
//  }


//  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
//    let pass = group.controls.password.value;
//    let confirmPass = group.controls.resetpassword.value;

//    return pass === confirmPass ? group.controls['resetpassword'].setErrors({ notSame: null }) : group.controls['resetpassword'].setErrors({ notSame: true })
//  }

//  // convenience getter for easy access to form fields
//  get f() { return this.clientEditForm.controls; }


//  public openClientInsertWindow() {
//    const windowRef = this.windowService.open({
//      title: 'Add Client',
//      content: ClientAccountInsertComponent,

//    });
//    this.clientOpened = true;

//    windowRef.result.subscribe((result) => {
//      if (result instanceof WindowCloseResult) {
//        this.clientOpened = false;
//      }
//    });
//  }

//  public openSiteInsertWindow() {
//    const windowRef = this.windowService.open({
//      title: 'Add Site',
//      content: SupplychainSiteInsertComponent,
//    });
//    this.siteOpened = true;

//    windowRef.result.subscribe((result) => {
//      if (result instanceof WindowCloseResult) {
//        this.siteOpened = false;
//      }
//    });
//  }
//}
