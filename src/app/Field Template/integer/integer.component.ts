import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MetadataLibService } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';

@Component({
  selector: 'fcid-integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IntegerComponent),
    multi: true
  }
  ]
})
export class IntegerComponent implements OnInit, ControlValueAccessor, ControlMetadata {
  defaultItem: Array<number>;
  propagateChange = (_: any) => { };
  @Input('field')
  public field: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  @Input() formGroupValue: FormGroup;
  @Input() required: any;
  @Input() width: any;
  @Input() readOnly: any;
  @Input() decimal: any;
  @Input() format: any;
  @Input()
  public min: number;
  @Input()
  public max: number;
  @Input()
  public spinner: any;
  @Input()
  public step: any;

  constructor(private mockMetadataService: MockMetadataService) { }

  ngOnInit() {
    if (this.fieldMetadata != undefined) {
      this.decimal = 0;//this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'decimal');
      this.format = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'format');
      let readonly = (this.readOnly) ? this.readOnly : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'readonly');
      this.readOnly = readonly === "true" ? true : false;
      let textBoxWidth = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'width')
      this.width = textBoxWidth === "0px" || textBoxWidth === null || textBoxWidth === "0%" ? "" : textBoxWidth;
      this.required = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'required') == "true" ? true : false;
      this.min = parseInt((this.min) ? this.min : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'min'));
      this.max = parseInt((this.max) ? this.max : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'max'));
      this.spinner = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'spinner') == "true" ? true : false;
      this.step = parseInt((this.step) ? this.step : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'step'));
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
