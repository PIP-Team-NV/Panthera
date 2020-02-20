import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MetadataLibService, KVP, lCI } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { error } from '@angular/compiler/src/util';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';

@Component({
  selector: 'fcid-textcombo',
  templateUrl: './text-combo.component.html',
  styleUrls: ['./text-combo.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextComboComponent),
    multi: true
  }
  ]
})
export class TextComboComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  @Input('field')
  public field: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  @Input() formGroupValue: FormGroup;
  @Input() width: any;
  defaultItem: Array<number>;
  metadata: any;
  isRequiredEnabled: any;
  @Input()
  listCoreItems: lCI[] = [];
  listCoreItemsBackup: lCI[] = [];
  @Input()
  listMultiSelectEnabled: boolean = true;
  data: KVP[];
  @Input('orderby')
  orderby: string = 'asc';
  defaultEnabled = false;
  @Input() readonly: any;
  @Input() defaultText: string;
  public allowCustom: boolean = true;
  dataBackup: any[];

  constructor(private mockMetadataService: MockMetadataService) { }
  propagateChange = (_: any) => { };
  ngOnInit() {

    this.defaultEnabled = true;
    if (this.fieldMetadata != undefined) {
      this.data = MockMetadataService.getList(this.fieldMetadata);
      this.dataBackup = this.data;
      //this.PrepareData();
    }
    let readonly = (this.readonly) ? this.readonly : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'readonly'); //need dynamic value
    try {
      this.readonly = readonly.toLowerCase() === "true" ? true : false;
    }
    catch (ex) {
      this.readonly = false;
    }

    let defaultText = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'defaultText');
    this.defaultText = defaultText ? defaultText : "";
    let textComboWidth = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'width')
    this.width = textComboWidth === "0px" || textComboWidth === null || textComboWidth === "0%" ? "" : textComboWidth;
    this.isRequiredEnabled = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'required') == "true" ? true : false;
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
    this.listCoreItemsBackup = this.listCoreItems;
  }

  public value: any = [];

  //Combobox implementation
  handleFilter(value) {
    this.data = this.dataBackup.filter((s) => s.DisplayName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
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
