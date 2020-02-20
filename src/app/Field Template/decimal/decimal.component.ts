import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MetadataLibService } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';

@Component({
  selector: 'fcid-decimal',
  templateUrl: './decimal.component.html',
  styleUrls: ['./decimal.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecimalComponent),
    multi: true
  }
  ]
})
export class DecimalComponent implements OnInit, ControlValueAccessor, ControlMetadata {
  @Input('field')
  public field: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  @Input() formGroupValue: FormGroup;
  defaultItem: any;
  @Input()
  public decimalValue: number;
  @Input()
  public min: number;
  @Input()
  public max: number;
  @Input()
  public step: number;
  @Input()
  public spinner: any;
  @Input() required: any;
  @Input() width: any;
  @Input() readonly: any;
  @Input() format: any;
  propagateChange = (_: any) => { };

  constructor(private mockMetadataService: MockMetadataService) { }

  ngOnInit() {
    if (this.fieldMetadata != undefined) {
      this.decimalValue = parseInt((this.decimalValue) ? this.decimalValue : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'decimalValue'));
      let readonly = (this.readonly) ? this.readonly : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'readonly'); //need dynamic value
      this.readonly = readonly === "true" ? true : false;
      let textBoxWidth = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'width')
      this.width = textBoxWidth === "0px" || textBoxWidth === null || textBoxWidth === "0%" ? "" : textBoxWidth;
      this.required = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'required') == "true" ? true : false;
      this.min = parseInt((this.min) ? this.min : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'min'));
      this.max = parseInt((this.max) ? this.max : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'max'));
      this.format = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'format');
      this.spinner = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'spinner') == "true" ? true : false;
      this.step = parseInt((this.step) ? this.step : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'step'));
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
