import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import { Location } from '@angular/common';
import { SecurityService } from '../Test Pages/Prototypes/Security/security.service';
import { MetadataLibService, lCI, ControlMetadata, KVP } from 'metadata-lib-fcid';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, ControlValueAccessor, ControlMetadata {
  public field: string;
  public fieldMetadata: any;
  passwordResetForm: FormGroup;
  statusMessage: string = '';
  propagateChange = (_: any) => { };
  defaultItem: any;
  @Input() formGroupValue: FormGroup;

  constructor(private location: Location,
    private _loginService: SecurityService ) { }

  ngOnInit() {
    this.passwordResetForm = new FormGroup({
      username : new FormControl(),
    })
  }

  resetPassword(){
    this._loginService.resetPassword(this.passwordResetForm.controls.username.value)
    .subscribe(result=>this.statusMessage= result as string);
  }
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
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
