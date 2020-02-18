import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from '@angular/forms';
import { ControlMetadata, MetadataLibService } from 'metadata-lib-fcid';

@Component({
  selector: 'fcid-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
  }
  ]
})
export class RadioButtonComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  @Input() formGroupValue: FormGroup;
  @Input('field') public field: string;
  @Input('fieldMetadata') public fieldMetadata: any;
  @Input() readOnly: boolean;
  @Input() width: string;
  @Input() required: any;
  propagateChange = (_: any) => { };
  defaultItem: any;
  
  constructor(private metadataLibService: MetadataLibService) { }

  ngOnInit() {
    if (this.fieldMetadata != undefined) {
      let width = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'width');
      this.width = width === "0" || width === "0px" || width === null || width === "0%" ? "" : width;
      let readonly = (this.readOnly) ? this.readOnly : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'readonly');
      this.readOnly = readonly === "true" ? true : false;
      this.required = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'required') == "true" ? true : false;
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
