import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MetadataLibService, KVP } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';

@Component({
  selector: 'fcid-textArea',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaComponent),
    multi: true
  }
  ]
})
export class TextAreaComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  propagateChange = (_: any) => { };
  defaultItem: any;
  textAreaLength: any;
  readonly: any;
  public errormsg: string;
  value: string;
  @Input() formGroupValue: FormGroup;
  @Input()
  public max: number;
  valRequired: any;
  @Input('field')
  public field: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  @Input() public rows: any;
  @Input() public autoSize: any;
  @Input() required: any;
  @Input() width: any;
  data: KVP[];

  constructor(private mockMetadataService: MockMetadataService) { }

  ngOnInit() {
    if (this.fieldMetadata != undefined) {
      let textAreaLength = parseInt((this.textAreaLength) ? this.textAreaLength : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'maxLength'));
      this.textAreaLength = isNaN(textAreaLength) ? "NaN" : textAreaLength;
      let Readonly = (this.readonly) ? this.readonly : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'readonly'); //need dynamic value
      try {
        this.readonly = Readonly.toLowerCase() === "true" ? true : false;
      }
      catch (ex) {
        this.readonly = false;
      }
      this.required = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'required') == "true" ? true : false;
      let rows = parseInt((this.rows) ? this.rows : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'rows'));
      this.rows = isNaN(rows) ? "NaN" : rows;
      this.autoSize = (this.autoSize) ? this.autoSize : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,  'autoSize') == "true" ? true : false;
      let textAreaWidth = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'width')
      this.width = textAreaWidth === "0px" || textAreaWidth === null || textAreaWidth === "0%" ? "" : textAreaWidth;

    }

  }

  //key press event for maxlenght
  onSearchChange(searchValue: string) {
    console.log("onSearchChange" + searchValue);
    if (searchValue.length > (this.textAreaLength - 1)) {
      this.value = "please provide string less than " + this.textAreaLength;

    } else {
      this.value = "";
    }
  }

  //on paste event
  pasteEvent($event: any) {
    console.log($event.target.value);
  }

  _controlValue: any;

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

  handleFilter(value) {

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

