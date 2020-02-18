import { FormGroup } from "@angular/forms";

export interface ControlMetadata{
    fieldMetadata: any;
    field: string;
    formGroupValue: FormGroup;
  }