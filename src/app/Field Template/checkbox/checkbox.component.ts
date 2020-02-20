import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MetadataLibService } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';

@Component({
  selector: 'fcid-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  @Input() formGroupValue: FormGroup;
  @Input('field') public field: string;
  @Input('fieldMetadata') public fieldMetadata: any;
  @Input() readonly: any;
  @Input() width: any;
  @Input() required: any;
  propagateChange = (_: any) => { };
  defaultItem: any;

  constructor(private mockMetadataService: MockMetadataService) { }

  ngOnInit() {
    if (this.fieldMetadata != undefined) {
      let readonly = (this.readonly) ? this.readonly : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'readonly'); //need dynamic value
      this.readonly = readonly === "true" ? true : false;
      let width = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'width')
      this.width = width === "0px" || width === null || width === "0%" ? "" : width;
      this.required = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'required') == "true" ? true : false;
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
