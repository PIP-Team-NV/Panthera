import { Component, OnInit,forwardRef } from '@angular/core';
import {  ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'fcid-form-date-picker-control',
  templateUrl: './form-date-picker-control.component.html',
  styleUrls: ['./form-date-picker-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormDatePickerControlComponent),
      multi: true
    }
  ]
})
export class FormDatePickerControlComponent implements OnInit,ControlValueAccessor {

  dateFormat: any;
  readOnly: boolean;

  constructor() {
  }

  propagateChange = (_: any) => { };

  ngOnInit() {
  }

  _controlValue;

  get controlValue() {

    return this._controlValue;

  }

  set controlValue(val) {
    if (!val) {
      this._controlValue = '';
    } else if (val !== '') {
      this._controlValue = new Date(val);
    } else {
      this._controlValue = val;
    }
    this.propagateChange(this._controlValue);
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

  onChange(value) {
    this.controlValue = value;
  }

  public selectedItem() {
    return this.controlValue;
  }

}
