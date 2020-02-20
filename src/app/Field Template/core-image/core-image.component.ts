import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MetadataLibService } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';

@Component({
  selector: 'fcid-core-image',
  templateUrl: './core-image.component.html',
  styleUrls: ['./core-image.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CoreImageComponent),
    multi: true
  }]
})
export class CoreImageComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  @Input() formGroupValue: FormGroup;
  @Input('field') public field: string;
  @Input('imgdata') public imgdata = {
    "coreId": "",
    "coreName": ""
  };
  @Input('fieldMetadata') public fieldMetadata: any;
  @Input() imageTooltipPrefix: string;
  @Input() imageTooltipPostfix: string;
  @Input() coreId: string;
  @Input() coreName: string;
  @Input() required: any;
  @Input() width: any;
  obj = {
    "coreId": "",
    "coreName": ""
  };
  imgUrl: string;
  toolTiptext: string;
  defaultItem: Array<number>;
  propagateChange = (_: any) => { };

  constructor(private mockMetadataService: MockMetadataService) {
  }

  public ngOnInit(): void {
    
    if (this.fieldMetadata != undefined) {
      let imageTooltipPrefix = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'imageTooltipPrefix');
      this.imageTooltipPrefix = imageTooltipPrefix ? imageTooltipPrefix : "";
      let imageTooltipPostfix = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'imageTooltipPostfix');
      this.imageTooltipPostfix = imageTooltipPostfix ? imageTooltipPostfix : "";
      this.required = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'required') == "true" ? true : false;
      let width = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,  'width')
      this.width = width === "0px" || width === null || width === "0%" ? "" : width;
    }
    this.obj = this.imgdata;
    this.coreId = this.obj.coreId;
    this.coreName = this.obj.coreName;

    this.createImage();

  }

  createImage() {
    if (this.coreId) {
      //let key = "Image_" + this.coreId;
      let key = this.coreId;
      this.imgUrl = key;
      this.toolTiptext = this.imageTooltipPrefix + " " + this.coreName + " " + this.imageTooltipPostfix;
    }
  }


  _controlValue: Array<number>;

  get controlValue() {
    return this._controlValue;
  }

  set controlValue(val: Array<number>) {
    if (val == undefined) {
      this._controlValue = this.defaultItem;
    } else {
      this._controlValue = val;
    }
    this.propagateChange(this._controlValue);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.controlValue = value;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched() {

  }
}
