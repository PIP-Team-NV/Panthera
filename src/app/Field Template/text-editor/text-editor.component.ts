import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MetadataLibService, KVP } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';

@Component({
  selector: 'fcid-textEditor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextEditorComponent),
    multi: true
  }
  ]
})
export class TextEditorComponent implements OnInit, ControlValueAccessor, ControlMetadata {
  @Input() formGroupValue: FormGroup;
  public value = '';
  @Input('field')
  public field: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  propagateChange = (_: any) => { };
  _controlValue: any;
  defaultItem: any;
  @Input() readonly: any;
  @Input() required: any;
  @Input() width: any;
  valRequired: any;

  constructor(private mockMetadataService: MockMetadataService) { }

  ngOnInit() {
    if (this.fieldMetadata != undefined) {
      let textEditorWidth = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'width')
      this.width = textEditorWidth === "0px" || textEditorWidth === null || textEditorWidth === "0%" ? "" : textEditorWidth;
      this.required = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'required') == "true" ? true : false;
    }
  }

  createForm() {
    if (this.required == true) {
      this.valRequired = Validators.required;
    }
    this.formGroupValue = new FormGroup({
      field: new FormControl({ disabled: true, value: '' }, [Validators.required])
    })
  }

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
