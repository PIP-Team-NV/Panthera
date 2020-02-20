import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MetadataLibService } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';

@Component({
  selector: 'fcid-hyperlink',
  templateUrl: './hyperlink.component.html',
  styleUrls: ['./hyperlink.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HyperlinkComponent),
      multi: true
    }
  ]
})
export class HyperlinkComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  @Input() formGroupValue: FormGroup;
  @Input('field')
  public field: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  @Input('App')
  app?: any;
  @Input('role')
  role?: any;
  @Input('allowPopup')
  allowPopup: any;
  @Input('imageUrl')
  imageUrl: string;
  @Input() readOnly: any;
  @Input() required: any;
  @Input() width: any;
  defaultItem: Array<number>;
  @Input()
  text: any;

  constructor(private mockMetadataService: MockMetadataService) { }
  propagateChange = (_: any) => { };

  ngOnInit() {
    if (this.fieldMetadata != undefined) {
      this.imageUrl = (this.imageUrl) ? this.imageUrl : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'imageUrl');
      let readonly = (this.readOnly) ? this.readOnly : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'readonly');
      this.readOnly = readonly === "true" ? true : false;
      let textBoxWidth = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'width');
      this.width = textBoxWidth === "0px" || textBoxWidth === null || textBoxWidth === "0%" ? "" : textBoxWidth;
      this.required = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'required') == "true" ? true : false;
      let AllowPopup = (this.allowPopup) ? this.allowPopup : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'allowPopup');
      this.allowPopup = AllowPopup === "true" ? true : false;    
    }

  }

  openPopup(link: string) {
    if (!/^(f|ht)tps?:\/\//i.test(link)) {
      link = "http://" + link;
    }
    if (link) {
      if (this.allowPopup == true)
        window.open(link, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes");
      else
        window.open(link);
    }
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




