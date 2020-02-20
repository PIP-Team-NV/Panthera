import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { MetadataLibService } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';

@Component({
  selector: 'fcid-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateTimeComponent),
    multi: true
  }]
})
export class DateTimeComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  @Input() formGroupValue: FormGroup;
  @Input('field') public field: string;
  @Input('fieldMetadata') public fieldMetadata: any;
  @Input() defaultDisplayCurrent: boolean;
  @Input() dateFormat: string;
  @Input() readOnly: boolean;
  @Input() width: string;
  @Input() nullText: string;
  @Input() required: any;
  propagateChange = (_: any) => { };
  defaultItem: any;
  isVisible: boolean = false;

  constructor(private mockMetadataService: MockMetadataService) { }

  ngOnInit() {
    debugger;
    if (this.fieldMetadata != undefined) {
      let datePickerWidth = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'width');
      this.width = datePickerWidth === "0" || datePickerWidth === "0px" || datePickerWidth === null || datePickerWidth === "0%" ? "" : datePickerWidth;
      let readonly = (this.readOnly) ? this.readOnly : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'readonly');
      this.readOnly = readonly === "true" ? true : false;
      let defaultDisplayCurrent = (this.defaultDisplayCurrent) ? this.defaultDisplayCurrent : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'defaultDisplayCurrent');
      this.defaultDisplayCurrent = defaultDisplayCurrent === "true" ? true : false;
      let dateFormat = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'dateFormat');
      this.dateFormat = dateFormat ? dateFormat : "";
      let nullText = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'nullText');
      this.nullText = nullText ? nullText : "";
      this.required = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'required') == "true" ? true : false;

      if(nullText != null || nullText != ""){
        this.isVisible = true;
      }

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
