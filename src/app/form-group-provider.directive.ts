import { Directive, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FormGroupProviderService} from './form-group-provider.service'

@Directive({
  selector: '[formGroupProvider]',
  providers: [FormGroupProviderService]
})
export class FormGroupProviderDirective {
@Input() formGroupValue: FormGroup;
  constructor( private _formGroupProviderService:FormGroupProviderService) {
  
   }
   ngAfterViewInit() {
    this._formGroupProviderService.formGroupValue= this.formGroupValue;
   }

}
