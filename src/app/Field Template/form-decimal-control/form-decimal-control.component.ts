import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';
import { MetadataLibService } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';

@Component({
  selector: 'fcid-form-decimal-control',
  templateUrl: './form-decimal-control.component.html',
  styleUrls: ['./form-decimal-control.component.css']
})
export class FormDecimalControlComponent implements OnInit , ControlValueAccessor, ControlMetadata{

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
  @Input() required: any;
  @Input() width: any;
  @Input() Readonly: any;
  @Input() format: any;
  propagateChange = (_: any) => { };

  constructor(private metadataLibService: MetadataLibService) { }

  ngOnInit() {
    if (this.fieldMetadata != undefined) {
      this.decimalValue = parseInt((this.decimalValue) ? this.decimalValue : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'decimalValue'));
      this.step = (this.step) ? this.step : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'step'); //need dynamic value 
      let Readonly = (this.Readonly) ? this.Readonly : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'readonly'); //need dynamic value
      this.Readonly = Readonly === "false" ? false : true;
      this.width = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'width');
	    this.required = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'required') == "true"? true : false;
      this.min = parseInt((this.min) ? this.min : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'min'));
      this.max = parseInt((this.max) ? this.max : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'max'));
      this.format = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'format');
    
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
