import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MetadataLibService, lCI, ControlMetadata, KVP } from 'metadata-lib-fcid';

@Component({
  selector: 'fcid-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
  }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  @Input('field')
  public field: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  @Input() formGroupValue: FormGroup;
  defaultItem: Array<number>;
  @Input() required: any;
  @Input() readonly: any;
  @Input() width: any;
  data: KVP[];
  @Input('orderby')
  orderby: string = 'asc';
  isRequiredEnabled: any;
  defaultEnabled = false;
  isReadonly = false;
  @Input()
  listCoreItems: lCI[] = [];
  @Input() defaultText: string;
  defaultListCoreItems = {};
  propagateChange = (_: any) => { };

  constructor(private metadataLibService: MetadataLibService) { }

  ngOnInit() {

    if (this.fieldMetadata != undefined) {
      this.data = MetadataLibService.getList(this.fieldMetadata);
      this.PrepareData();

      let defaultText = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'defaultText');
      this.defaultText = defaultText ? defaultText : "";
      this.defaultListCoreItems = { "coreItemId": null, "coreItemValue": this.defaultText };

      let dropdownWidth = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'width')
      this.width = dropdownWidth === "0px" || dropdownWidth === null || dropdownWidth === "0%" ? "" : dropdownWidth;
      this.isRequiredEnabled = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'required') == "true" ? true : false;
      this.readonly = (this.readonly) ? this.readonly : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'readonly');
      try {
        this.isReadonly = (this.readonly.toLowerCase() == "true") ? true : false;
      }
      catch (ex) {
        this.isReadonly = false;
      }
      if (this.isRequiredEnabled == true) {
        this.defaultEnabled = false;
      } else {
        this.defaultEnabled = true;
      }
    }
  }

  private PrepareData() {

    this.listCoreItems = [];
    if (!this.data) return;
    if (this.orderby === 'asc') {
      this.data.sort((a, b) => {
        if (a.value.sort < b.value.sort) return -1;
        else if (a.value.sort > b.value.sort) return 1;
        else return 0;
      }).forEach(kvp => {
        var item: lCI = { coreItemId: parseInt(kvp.key, 10), coreItemValue: kvp.value.val };
        this.listCoreItems.push(item);
      });
    }
    else {
      this.data.sort((a, b) => {
        if (a.value.sort < b.value.sort) return 1;
        else if (a.value.sort > b.value.sort) return -1;
        else return 0;
      }).forEach(kvp => {
        var item: lCI = { coreItemId: parseInt(kvp.key, 10), coreItemValue: kvp.value.val };
        this.listCoreItems.push(item);
      });
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

  onChange(value) {
    this.controlValue = value;
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


  public getMetadata() {

  }


}
