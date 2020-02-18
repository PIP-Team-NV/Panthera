import { Subscription } from 'rxjs';
import { Validators, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[compare]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true }]
})
export class CompareValidatorDirective implements Validators {

  @Input('compare') controlNameToCompare: string

  validate(c: AbstractControl): ValidationErrors | null {
    if(c.value === null && c.value.length === 0){
      return null;
    }
    const controlToCompare = c.root.get(this.controlNameToCompare);
    if (controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
        c.updateValueAndValidity();
        subscription.unsubscribe();
      })
    }
    return controlToCompare && controlToCompare.value !== c.value ? { 'compare': true } : null;
  }

}
