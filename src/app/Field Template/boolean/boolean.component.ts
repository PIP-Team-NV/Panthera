import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MetadataLibService } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';

@Component({
  selector: 'fcid-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BooleanComponent),
    multi: true
  }]
})
export class BooleanComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  @Input() formGroupValue: FormGroup;
  @Input('field') public field: string;
  @Input('fieldMetadata') public fieldMetadata: any;
  @Input() public text0: string;
  @Input() public text1: string;
  @Input() public image0: string;
  @Input() public image1: string;
  @Input() public image0ToolTip: string;
  @Input() public image1ToolTip: string;
  @Input() public nullText: string;
  @Input() public class0: string;
  @Input() public class1: string;
  @Input() required: any;
  propagateChange = (_: any) => { };
  defaultItem: any;
  isVisible: boolean = false;
  isLabelVisible: boolean = false;
  img1IsVisible: boolean = false;
  img0IsVisible: boolean = false;
  spanValue: string;
  labelValue: string;
  fieldValue: string;

  constructor(private mockMetadataService: MockMetadataService) { }

  ngOnInit() {
   
    if (this.fieldMetadata != undefined) {
      let text0 = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'text0');
      this.text0 = text0 ? text0 : "";
      let text1 = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'text1');
      this.text1 = text1 ? text1 : "";
      let image0 = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'image0');
      this.image0 = image0 ? image0 : "";
      let image1 = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'image1');
      this.image1 = image1 ? image1 : "";
      let image0ToolTip = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'image0ToolTip');
      this.image0ToolTip = image0ToolTip ? image0ToolTip : "";
      let image1ToolTip = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'image1ToolTip');
      this.image1ToolTip = image1ToolTip ? image1ToolTip : "";
      let class0 = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'class0');
      this.class0 = class0 ? class0 : "";
      let class1 = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'class1');
      this.class1 = class1 ? class1 : "";
      let nullText = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'nullText');
      this.nullText = nullText ? nullText : "";
      this.required = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'required') == "true" ? true : false;

    }
    this.bingData();
  }

  bingData() {
    this.fieldValue = this.formGroupValue.get(this.field).value;
    var boolValue = this.fieldValue.toLowerCase() == 'true' ? true : false; 
    if (boolValue == true) {
      if (this.image1 != null || this.image1 != "") {
        this.isLabelVisible = false;
        this.isVisible = false;
        this.img1IsVisible = true;
      }
      else if (this.class1 != null || this.class1 != "") {
        this.isLabelVisible = false;
        this.isVisible = true
        this.spanValue = this.class1;
      }
      else {
        this.isLabelVisible = true;
        this.labelValue = this.text1;
        this.formGroupValue.controls[this.field].setValue(this.labelValue);
      }
    }
    else if (boolValue == false) {
      if (this.image0 != null || this.image0 != "") {
        this.isLabelVisible = false;
        this.img0IsVisible = true;
      }
      else if (this.class0 != null || this.class0 != "") {
        this.isLabelVisible = false;
        this.isVisible = true;
        this.spanValue = this.class0;
      }
      else {
        this.isLabelVisible = true;
        this.labelValue = this.text0;
        this.formGroupValue.controls[this.field].setValue(this.labelValue);
      }
    }
    else if (this.nullText != null || this.nullText != "") {
      this.isLabelVisible = true;
      this.labelValue = this.nullText;
      this.formGroupValue.controls[this.field].setValue(this.labelValue);
    }
  }

  _controlValue: any;

  get controlValue() {
    return this._controlValue;
  }

  set controlValue(val: any) {
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
