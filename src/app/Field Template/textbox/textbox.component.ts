import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MetadataLibService, KVP } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { error } from '@angular/compiler/src/util';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';


@Component({
  selector: 'fcid-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextboxComponent),
    multi: true
  }
  ]
})
export class TextboxComponent implements OnInit, ControlValueAccessor, ControlMetadata {
  @Input() textAreaLength: number;
  @Input() readOnly: any;
  @Input() formGroupValue: FormGroup;
  public errormsg: string;
  value: string;
  @Input() required: any;
  @Input() public maxLength: any;
  @Input('field')
  public field: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  @Input() public isPasteEnable: any;
  @Input() width: any;
  valRequired: any;
  propagateChange = (_: any) => { };
  _controlValue: any;
  defaultItem: any;

  data: KVP[];

  constructor(private mockMetadataService: MockMetadataService) { }

  ngOnInit() {
    debugger;
    if (this.fieldMetadata != undefined) {
      let readonly = (this.readOnly) ? this.readOnly : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'readonly');
      this.readOnly = readonly === "true" ? true : false;
      let textBoxWidth = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'width')
      this.width = textBoxWidth === "0px" || textBoxWidth === null || textBoxWidth === "0%" ? "" : textBoxWidth;
      this.required = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'required') == "true" ? true : false;
      this.maxLength = parseInt((this.maxLength) ? this.maxLength : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'maxLength'));
    }

    this.createForm();
  }

  createForm() {
    if (this.required == true) {
      this.valRequired = Validators.required;
    }
  }

  //key press event for maxlenght
  onSearchChange(searchValue: string) {
    console.log(searchValue);
    if (searchValue.length > (this.textAreaLength - 1)) {
      this.value = "please provide string less than " + this.textAreaLength;

    } else {
      this.value = "";
    }

  }

  //on paste event
  onPaste($event: any) {
    return this.isPasteEnable;
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
