import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MetadataLibService, FcidMetadata } from 'fcid-metadata-lib';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';
import { StartupService } from 'src/startup.service';
import { MetadataServiceService } from 'src/app/services/metadata-service.service';


@Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BehaviorSubject<FcidMetaDataModel[]> implements OnInit, OnDestroy {

   @ViewChild('textareaContent') textArea: ElementRef;
   testForm: FormGroup;
   private subject$: Observable<FcidMetaDataModel[]>;
   private cache$: Observable<Object>;
   _doamin: string;
   _context: string;
   _isThisTest: boolean = false;
   private _serviceURL: string;
   _apiVersion: string = 'api/v1/';
   mockData = [];
   fields: Array<FcidMetaDataModel> = [];
   isEnabled = false;
   private _serviceSubscription: Subscription;
   public connectionTypes: Array<ConnectionType> = [
      { id: 1, value: "Http" }, { id: 2, value: "File" }, { id: 3, value: "Mock" }
   ];

   public languages: Array<Language> = [
      { id: 1, value: "English" }, { id: 2, value: "French" }, { id: 3, value: "Dutch" }, { id: 4, value: "Chinease" }, { id: 5, value: "Japanese" }
   ];
   public fieldControls: Array<FcidMetaDataModel> = [];
   public data: Array<FcidMetaDataModel> = [];

   public domains: Array<any> = [
      { id: 1, value: "Select" }, { id: 2, value: "client.account" }, { id: 3, value: "site.account" }
   ];

   public contexts: Array<any> = [
      { id: 1, value: "Select" }, { id: 2, value: "account.manage" }, { id: 3, value: "site.edit" }
   ];


   selectedFieldControl: FcidMetaDataModel;
   MetaDataArray: Array<{ key: string, value: string, label: string }> = [];
   metaData: any = undefined;
   textAreaContent: string = "";

   constructor(private metadataLibService: MetadataLibService, private startupConfig: StartupService,
      private metadataService: MetadataServiceService, private mockMetaDataService: MockMetadataService) {
      super(null);
      //   this._isThisTest = true;
      //  this.getData();
   }

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

   ngOnInit() {
      this.testForm = new FormGroup({
      });
      if (this._serviceURL && this._serviceURL != "")
         return this._serviceURL;
      if (this.startupConfig.startupData && this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT) {
         this._serviceURL = `https://foodchainidbusinessmetadata-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net/`;
         if (this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT == "Production") {
            this._serviceURL = `https://foodchainidbusinessmetadata-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net/`;
         }
      }
   }

   onChangeConnectionType(value: any) {
      if (value.value == "Mock") {
         this._isThisTest = true;
      } else {
         this._isThisTest = false;
      }
      this.getData();
   }

   onChangeDomain(value: any) {
      this._doamin = value.value;
   }

   onChangeContext(value: any) {
      this._context = value.value;
      this.mockData = [];
      this.fieldControls = [];
      this.metaData = null;
      this.MetaDataArray = [];
      this.isEnabled = false;
      this.textArea.nativeElement.value = null;
      this.getData();
   }

   onChangeLanguage(value: any) {

   }

   public getData() {
      if (this._doamin == "client.account" && this._context == "account.manage") {
         this.metadataService.getClientEditJSON().subscribe(data => {
            this.mockData = data;
            this.mockMetaDataService.setProperties(this._doamin, this._context, this._isThisTest, this._serviceURL, this._apiVersion);
            this.mockMetaDataService.query(this.mockData);
            this.getFieldControls();
         });
      } else if (this._doamin == "site.account" && this._context == "site.edit") {
         this.metadataService.getSiteEditJSON().subscribe(data => {
            this.mockData = data;
            this.mockMetaDataService.setProperties(this._doamin, this._context, this._isThisTest, this._serviceURL, this._apiVersion);
            this.mockMetaDataService.query(this.mockData);
            this.getFieldControls();
         });
      } else {
         this.mockData = [];
         this.fieldControls = [];
         this.metaData = null;
         this.MetaDataArray = [];
         this.isEnabled = false;
         this.textArea.nativeElement.value = null;
         // this.metadataService.getJSON().subscribe(data => {
         //    this.mockData = data;
         //    this.mockMetaDataService.setProperties(this._doamin, this._context, this._isThisTest, this._serviceURL, this._apiVersion);
         //    this.mockMetaDataService.query(this.mockData);
         //    this.getFieldControls();
         // });
      }
   }

   // Get all field control list   
   public getFieldControls(): void {
      this.mockMetaDataService.subscribe((result) => {
         debugger;
         if (result.length > 0) {
            this.fieldControls = result;
            this.fields = result;
            let fieldsCtrls = {};
            for (let field of this.fields) {
               fieldsCtrls[field.fieldCode] = new FormControl('', Validators.required)
            }
            this.testForm = new FormGroup(fieldsCtrls);
            this.isEnabled = true;
            this.selectedFieldControl = this.fieldControls[0];
            this.textAreaContent = JSON.stringify(this.selectedFieldControl);
            this.selectFieldControl(this.selectedFieldControl);
         }
      });
      //this.mockMetaDataService.unsubscribe();
   }

   //Test metadata functionality 
   public onTestMetadataBtnClick(): void {
      //Get the change metadata values and assign it to the textArea value
      let selectedFieldControl = JSON.parse(JSON.stringify(this.selectedFieldControl));
      //Change the json for display name and fieldhelp
      this.MetaDataArray.forEach(x => {
         if (x.key == "DisplayName" || x.key == "FieldHelp") {
            selectedFieldControl.options.forEach(selectedControl => {
               if (selectedControl.key == x.key) {
                  selectedControl.value[0].value.val = x.value;
               }
            });
         }
         else {
            try {
               selectedFieldControl.options.find(sfc => sfc.key == "UIHint").value.forEach(y => {
                  if (y.key == x.key) {
                     y.value.val = x.value;
                  }
               })
            }
            catch (err) {
               console.log(err);
            }

         }
      });

      this.textArea.nativeElement.value = JSON.stringify(selectedFieldControl);

      //call the testJsonbutton click
      this.onTestJasonBtnClick();
   }

   //Test json functionality 
   public onTestJasonBtnClick(): void {
      let textAreaContent = (this.textArea.nativeElement.value).toString();
      try {
         this.metaData = JSON.parse(textAreaContent);
         this.MetaDataArray = [];
         this.MetaDataArray.push({ key: "DisplayName", value: this.metadataLibService.getFieldAttributeParam([this.metaData], this.selectedFieldControl.fieldCode, 'DisplayName', 'ListCoreItem'), label: "Display Name" })
         this.MetaDataArray.push({ key: "FieldHelp", value: this.metadataLibService.getFieldAttributeParam([this.metaData], this.selectedFieldControl.fieldCode, 'FieldHelp', 'ListCoreItem'), label: "Field Help" })
         try {
            this.metadataLibService.getFieldAttributes([this.metaData], this.selectedFieldControl.fieldCode).find(x => { return x.key == "UIHint" }).value.forEach((key) => {
               this.MetaDataArray.push({ key: key.key, value: key.value.val, label: key.key });
            });
         }
         catch (err) {
            console.log(err);
         }
      }
      catch (err) {
         console.log("Invalid json");
      }
   }

   //Reset all componet modifications to defaults
   public onResetFromDBBtnClick(): void {
      this.textArea.nativeElement.value = JSON.stringify(this.selectedFieldControl);
      this.selectFieldControl(this.selectedFieldControl);
   }

   /*Get selected field control and create metadata 
     and json value for test json functionality */
   public selectFieldControl(control): void {
      this.MetaDataArray = [];
      this.selectedFieldControl = control;
      this.textArea.nativeElement.value = JSON.stringify(this.selectedFieldControl);
      this.metaData = this.mockMetaDataService.getMetadataByField(this.fieldControls, control.fieldCode);
      //this.MetaDataArray.push({ key: "DisplayName", value: this.mockMetaDataService.getFieldAttributeParam(this.fieldControls, control.itemName, 'DisplayName', 'ListCoreItem'), label: "Display Name" })
      //this.MetaDataArray.push({ key: "FieldHelp", value: this.mockMetaDataService.getFieldAttributeParam(this.fieldControls, control.itemName, 'FieldHelp', 'ListCoreItem'), label: "Field Help" })
      try {
         this.mockMetaDataService.getFieldAttributes(this.fieldControls, control.itemName).find(x => { return x.key == "UIHint" }).value.forEach((key) => {
            this.MetaDataArray.push({ key: key.key, value: key.value.val, label: key.key });
         });
      }
      catch (err) {
         console.log(err);
      }
   }

   //dropdown value change
   public valueChange(value: any): void {
      if (value) {
         let control = this.fieldControls.find(x => { return x.fieldCode === value });
         this.selectFieldControl(control);
      }
   }

   //Search box autocomplete function
   public filterChange(filter: string): void {
      this.data = this.fieldControls.filter((s) => s.fieldCode.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
   }

   ngOnDestroy(): void {
      if (this._serviceSubscription) {
         this._serviceSubscription.unsubscribe();
      }
   }
}

export interface ConnectionType {
   id: number;
   value: string;
}

export interface Language {
   id: number;
   value: string;
}

export interface FcidMetaDataModel {
	routeId: number,
	apiId: number,
	fieldCode: string,
	metaType: string,
	metas?: controlparamsModel[]
}

export interface controlparamsModel {
	metaId: number,
	ftCode: string,
	label: string,
	toolTip: string,
	descr: string,
	MetaParms?: metaParms[]
}

export interface metaParms {
	required: string,
	maxlength: string,
	readonly: string,
	width: string
}

export interface MockMetadata {
   metadataId: number,
   itemName: string;
   itemType: string;
   options?: ControlParam[];
}
export interface ControlParameter {
   key?: string,
   value: KVP[]
}

export interface ControlParam {
   key?: string,
   value: KLP[]
}

export interface KLP {
   key?: any,
   value?: { sort?: string, val: any, val2: boolean, val3: any, val4: any[] }
}
export interface KVP {
   key?: any,
   value?: { sort?: number, val: any }
}
export interface Items {
   item1?: any,
   item2?: { sort?: number, val: any }
}
export interface lCI {
   coreItemId?: number,
   coreItemValue: any,
   coreItemBool?: boolean,
   coreItemParentId: any,
   coreItemClassCode: any,
   coreItemChild?: any[],
}

export interface CCI {
   item1?: number,
   item2: any,
   item3?: boolean,
   item4: any,
   item5?: any[],
}



