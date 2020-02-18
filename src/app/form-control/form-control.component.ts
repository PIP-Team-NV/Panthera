import { MockMetadataService } from './../mockMetadata/mock-metadata.service';
import { Component, OnInit, Input, TemplateRef, ViewChild, AfterViewInit, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, ComponentRef, OnChanges } from '@angular/core';
import { MetadataLibService, ControlMetadata } from 'metadata-lib-fcid'
import { Subscription } from 'rxjs';
import { FormGroup, } from '@angular/forms';
import { FormGroupProviderService } from '../form-group-provider.service';

@Component({
  selector: 'fcid-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit, ControlMetadata, OnChanges {

  @Input('labelName') labelName: string;
  @Input('helpText') helpText: string;
  @Input('field') field: string;
  @Input('fieldData') fieldData: string;
  @Input('fieldvalue') fieldvalue: string;
  @Input('formGroupValue') formGroupValue: FormGroup;
  @Input('gridDisplayData') gridDisplayData = [];
  @Input('gridHistoryData') gridHistoryData = [];
  @Input('fieldDataValue') fieldDataValue = [];
  @Input('itemsSearch') itemsSearch = [];
  @Input('imgdata') imgdata = {};
  @Input('showFieldHelp') showFieldHelp: boolean = true;
  @Input('controlOverride') controlOverride: string;
  @Input('metaData') metaData: string;
  @Input() formControlName: String;
  @Input() labelTemplate: TemplateRef<any>;
  @Input() fieldHelpTemplate: TemplateRef<Component>;
  @Input() controlTemplate: TemplateRef<any>;
  @ViewChild('defaultControlTemplate') defaultControlTemp: TemplateRef<any>;
  @ViewChild('controlTemplate') overrideControlTemp: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;
  createdComponenet: ComponentRef<any>;
  _serviceSubscription: Subscription;
  componentSelector: any;
  fieldMetadata: any;
  labelText: string;
  itemObj: any;
  helpObj: any;
  fieldArr = [];
  helptextarr = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private metadataLibService: MetadataLibService,
    private _formGroupProviderService: FormGroupProviderService, private mockDataService: MockMetadataService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.vc.clear();
    var metaData = this.metaData ? this.metaData : undefined;
    this.embedComponent(metaData);
  }

  embedComponent(fieldMetadata) {
    this._serviceSubscription = this.mockDataService.subscribe((result) => {
      if (result === undefined || result === null) return;
      if (fieldMetadata) {
        this.labelName = this.mockDataService.getFieldAttributeLabel([fieldMetadata], this.field);
        this.helpText = this.mockDataService.getFieldAttributeHelp([fieldMetadata], this.field);
      }
      else {
        this.labelName = this.mockDataService.getFieldAttributeLabel(result, this.field);
        this.helpText = this.mockDataService.getFieldAttributeHelp(result, this.field);
      }
      if (this.controlOverride !== undefined) { this.componentSelector = this.controlOverride; }
      else {
        this.componentSelector = this.mockDataService.getUIHint(result, this.field);
      }
      if (this.controlTemplate !== undefined) {
        this.vc.createEmbeddedView(this.controlTemplate);
      }
      else if (this.componentSelector != undefined) {
        //getting componenet factory by looking for componenet selector 
        const factories = Array.from(this.componentFactoryResolver['_factories'].values());
        let factoryclass = factories.find((x: any) => x.selector === this.componentSelector);
        //    this.fieldMetadata = this.mockDataService.getMetadataByField(result, this.field);
        this.fieldMetadata = fieldMetadata ? fieldMetadata : this.mockDataService.getMetadataByField(result, this.field);
        //let fcidData = this.fieldMetadata.options
        // for (let i = 0; i < fcidData.length; i++) {
        //   this.itemObj = fcidData[0];
        //   this.helpObj = fcidData[1];
        // }
        // this.fieldArr = [];
        // this.helptextarr = [];
        // let valArr = this.itemObj.value;
        // let helpArr = this.helpObj.value;
        // for (let j = 0; j < valArr.length; j++) {
        //   let dataItemVal = valArr[j].value.val;
        //   this.fieldArr.push(dataItemVal);
        // }
        // for (let k = 0; k < helpArr.length; k++) {
        //   let dataItemVal = helpArr[k].value.val;
        //   this.helptextarr.push(dataItemVal);
        // }
        var componentFactory = factoryclass as ComponentFactory<any>;
        if (this.fieldMetadata != undefined) {
          this.createdComponenet = this.vc.createComponent(componentFactory);
          this.createdComponenet.instance.fieldMetadata = this.fieldMetadata;
          this.createdComponenet.instance.field = this.field;
          this.createdComponenet.instance.formGroupValue = this._formGroupProviderService.formGroupValue;
          //this.createdComponenet.instance.formGroupValue = this.formGroupValue;
          this.createdComponenet.instance.fieldData = this.fieldData;
          this.createdComponenet.instance.fieldvalue = this.fieldvalue;
          this.createdComponenet.instance.gridDisplayData = this.gridDisplayData;
          this.createdComponenet.instance.gridHistoryData = this.gridHistoryData;
          this.createdComponenet.instance.fieldDataValue = this.fieldDataValue;
          this.createdComponenet.instance.itemsSearch = this.itemsSearch;
          this.createdComponenet.instance.imgdata = this.imgdata;
          //this.createdComponenet.instance.className="col-md-7";
        }
      } else {
        this.vc.createEmbeddedView(this.defaultControlTemp);
      }
    })
  }
}


