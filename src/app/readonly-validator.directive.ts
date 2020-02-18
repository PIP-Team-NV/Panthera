import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[toggleReadonly]'
})
export class ReadonlyValidatorDirective {

  @Input() public set toggleReadonly(condition: boolean) {
    if (condition) {
      (<HTMLElement>this.element.nativeElement).setAttribute('readonly', 'true');
    } else {
      (<HTMLElement>this.element.nativeElement).removeAttribute("readonly");
    }
  }

  constructor(
    private element: ElementRef
  ) { }

}




