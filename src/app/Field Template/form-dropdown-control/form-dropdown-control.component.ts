import { Component, OnInit, forwardRef } from '@angular/core';
import { lCI } from  '../../Metadata/metadata-lib.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'fcid-form-dropdown-control',
  templateUrl: './form-dropdown-control.component.html',
  styleUrls: ['./form-dropdown-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormDropdownControlComponent),
      multi: true
    }
  ]
})
export class FormDropdownControlComponent implements OnInit, ControlValueAccessor {

  public defaultItem: lCI = {
    coreItemId: 0, coreItemValue: 'Select item...'
  }


  listCoreItems: any;
  constructor() { }
  propagateChange = (_: any) => { };
  ngOnInit() {

  }
  _controlValue: number;

  get controlValue() {
    return this._controlValue;

  }

  set controlValue(val: number) {
    if (val == undefined || val == 0) {
      this._controlValue = this.defaultItem.coreItemId;
    } else {
      this._controlValue = val;
    }
    this.propagateChange(this._controlValue);
  }

  onChange(value) {
    this.controlValue = value;
  }

  public selectedItem() {
    return this.controlValue;
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.controlValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched() { }

}
