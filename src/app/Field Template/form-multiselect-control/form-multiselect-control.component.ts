import { Component, OnInit, Input, OnDestroy, forwardRef } from '@angular/core';
import { MetadataLibService, lCI, KVP } from '../../Metadata/metadata-lib.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ControlMetadata } from '../../Metadata/ControlMetadata';

@Component({
  selector: 'fcid-form-multiselect-control',
  templateUrl: './form-multiselect-control.component.html',
  styleUrls: ['./form-multiselect-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormMultiselectControlComponent),
      multi: true
    }
  ]
})
export class FormMultiselectControlComponent implements OnInit, ControlValueAccessor {
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
  fieldMetadata: any;

  public defaultItem: Array<number>;
  listCoreItems: lCI[] = [];
  data: KVP[];
  @Input('orderby')
  orderby: string = 'asc';
  constructor(private metadataService: MetadataLibService) { }

  propagateChange = (_: any) => { };

  ngOnInit() {
    if (this.fieldMetadata != undefined) {
      this.data = this.getList(this.fieldMetadata);
      this.PrepareData();
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

  public getList(result: any) {
    if (!result) return;
    var option = result ? result.options.find(i => i.key === 'List') : null;
    return option ? option.value : null;
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

}
