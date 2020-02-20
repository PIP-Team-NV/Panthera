import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MetadataLibService, KVP } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';


@Component({
  selector: 'fcid-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UrlComponent),
    multi: true
  }
  ]
})
export class UrlComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  @Input() formGroupValue: FormGroup;
  @Input('field')
  public field: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  url: string;
  propagateChange = (_: any) => { };
  _controlValue: any;
  defaultItem: any;
  @Input()
  text: any;

  constructor(private mockMetadataService: MockMetadataService) { }

  ngOnInit() {
    if (this.fieldMetadata != undefined) {
      this.url = (this.url) ? this.url : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'url');
    }
    this.checkUrl();
    let hyperlinkText = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'text');
    this.text = hyperlinkText ? hyperlinkText : ""; 
  }

  checkUrl() {
    if (!/^(f|ht)tps?:\/\//i.test(this.url)) {
      this.url = "http://" + this.url;
    }
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
