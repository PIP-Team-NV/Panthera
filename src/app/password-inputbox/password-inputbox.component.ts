import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MetadataLibService, lCI, ControlMetadata, KVP } from 'metadata-lib-fcid';

@Component({
  selector: 'fcid-passwordInputbox',
  templateUrl: './password-inputbox.component.html',
  styleUrls: ['./password-inputbox.component.scss']
})
export class PasswordInputboxComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  @Input('field')
  public field: string;
  @Input('fieldData')
  public fieldData: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  @Input() formGroupValue: FormGroup;
  @Input() placeholder: string;
  @Input() paswordWidth: any;
  @Input() errorMsg: string;
  @Input() required: any;
  valRequired: any;
  @ViewChild('inputRef') inputRef: ElementRef;
  public isEnabled: boolean = true;
  propagateChange = (_: any) => { };
  defaultItem: Array<number>;
  passMatchError: boolean = false;

  constructor(private metadataLibService: MetadataLibService) { }

  ngOnInit() {
    let paswordWidth = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'paswordWidth');
    this.paswordWidth = paswordWidth === "0px" || paswordWidth === null || paswordWidth === "0%" ? "" : paswordWidth;
    this.required = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'required') == "true"? true : false;
    let errorMsg = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'errorMsg');
    this.errorMsg = errorMsg  ? errorMsg : "";
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

  onChange(value) {
    this.controlValue = value;
  }

  handleFilter() {
   
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


  public getMetadata() {

  }  

  public isSame(pass, confirmPass){
    let password = this.formGroupValue.get(pass).value;
    let confirmPassword = this.formGroupValue.get(confirmPass).value;
    if(password!="" && confirmPassword!="" && password== confirmPassword){
       this.passMatchError = false;
    }
    else if(password!="" && confirmPassword!=""){
      this.passMatchError = true;
    }


  }

}
