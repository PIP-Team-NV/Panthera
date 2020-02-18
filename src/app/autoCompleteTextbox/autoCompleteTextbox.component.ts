import { Component, OnInit, Input, ViewChild, forwardRef } from '@angular/core';
import { AutoCompleteComponent } from '@progress/kendo-angular-dropdowns';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MetadataLibService, lCI, ControlMetadata, KVP } from 'metadata-lib-fcid';

@Component({
  selector: 'fcid-autoCompleteTextbox',
  templateUrl: './autoCompleteTextbox.component.html',
  styleUrls: ['./autoCompleteTextbox.component.scss']
})
export class AutoCompleteTextboxComponent implements OnInit, ControlValueAccessor, ControlMetadata {
  public fieldMetadata: any;
  public field: string;
  listCoreItems: lCI[] = [];
  data: KVP[];
  listItems = [];
  listitemsArr = [];
  @Input('orderby')
  orderby: string = 'asc';
  @Input() formGroupValue: FormGroup;
  propagateChange = (_: any) => { };
  defaultItem: Array<number>;
  @Input() width: any;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() isRequired: boolean = true;
  @Input() readonly: any;
  isRequiredEnabled: any;
  defaultEnabled = false;
  @Input() source: Array<string> = [];
  isReadonly = false;
  @ViewChild('autocomplete') public autocomplete: AutoCompleteComponent;

  constructor(private metadataLibService: MetadataLibService) {
  }

  ngOnInit() {

    if (this.fieldMetadata != undefined) {
      this.data = MetadataLibService.getList(this.fieldMetadata);
      this.PrepareData();
      this.listitemsArr = this.listItems.slice();
      this.defaultEnabled = true;
    }
    this.readonly = (this.readonly) ? this.readonly : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'readonly');
    this.isReadonly = (this.readonly == "true") ? true : false;
    this.width = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'width');
    this.isRequiredEnabled = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'required') == "true" ? true : false;
    if (this.isRequiredEnabled == true) {
      this.defaultEnabled = false;
    } else {
      this.defaultEnabled = true;
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
    for (let listItemKey of this.listCoreItems) {
      this.listItems.push(listItemKey.coreItemValue);
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

  handleFilter(value) {
    if (value.length >= 3) {
      this.listitemsArr = this.listItems.filter((s) => s.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    } else {
      this.autocomplete.toggle(false);
    }
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
