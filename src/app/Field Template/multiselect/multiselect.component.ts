import { Component, OnInit, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MetadataLibService, KVP, lCI } from '../../Metadata/metadata-lib.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';

@Component({
  selector: 'fcid-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiselectComponent),
    multi: true
  }
  ]
})
export class MultiselectComponent implements OnInit, ControlValueAccessor, ControlMetadata {
  @Input('field')
  public field: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  @Input() formGroupValue: FormGroup;
  defaultItem: Array<number>;
  metadata: any;
  @Input()
  readonly: any;
  @Input()
  listCoreItems: lCI[] = [];
  listCoreItemsBackup: lCI[] = [];
  @Input()
  listMultiSelectEnabled: boolean = true;
  data: KVP[];
  data1 = [];
  @Input('orderby')
  orderby: string = 'asc';
  @ViewChild("list") list;
  @Input() required: any;
  @Input() width: any;
  @Input() maxNoSelection: any;
  @Input() filterValue: any;
  propagateChange = (_: any) => { };
  @Input() defaultText: string;
  dataBackup: any[];

  constructor(private mockMetadataService: MockMetadataService) { }

  ngOnInit() {
    debugger;
    if (this.fieldMetadata != undefined) {
      this.data1 = MockMetadataService.getList(this.fieldMetadata);
      this.dataBackup = this.data1;
      debugger;
      //this.PrepareData();
    }
    let Readonly = (this.readonly) ? this.readonly : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'readonly'); //need dynamic value
    try {
      this.readonly = Readonly.toLowerCase() === "true" ? true : false;
    }
    catch (ex) {
      this.readonly = false;
    }

    let defaultText = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'defaultText');
    this.defaultText = defaultText ? defaultText : "";
    let listBoxWidth = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'width')
    this.width = listBoxWidth === "0px" || listBoxWidth === null || listBoxWidth === "0%" ? "" : listBoxWidth;
    this.maxNoSelection = parseInt((this.maxNoSelection) ? this.maxNoSelection : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'maxNoSelection'));
    let filterValue = parseInt((this.filterValue) ? this.filterValue : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'filterValue'));
    this.filterValue = isNaN(filterValue) ? 0 : filterValue;
    this.required = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'required') == "true" ? true : false;
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
    console.log(this.listCoreItems);
    this.listCoreItemsBackup = this.listCoreItems;
  }

  ngAfterViewInit() {
    this.list.filterChange.asObservable()
      .subscribe(x => {
        if (x.length >= this.filterValue) {
          this.data1 = this.dataBackup.filter((item) => {
            return item.DisplayName.toLowerCase().indexOf(x.toLowerCase()) > -1;
          });
        }
        else {
          this.data1 = this.dataBackup;
        }
      });
  }

  handleFilterEvent(value) {
    // if (value.length >= this.filterValue) {
    //   this.listCoreItems = this.listCoreItemsBackup.filter((s) => s.coreItemValue.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    // } else {
    //   //this.multiselect.toggle(false);
    // }
  }

  public value: any = [];

  public isItemSelected(itemText: string): boolean {
    return this.value.some(item => item.DisplayName === itemText);
  }

  public handleValue(selected) {
    debugger;
    if (!isNaN(this.maxNoSelection)) {
      if (selected.length <= this.maxNoSelection) {
        this.value = selected;
      } else {
        this.value = this.value.map(item => item);
      }
    }
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
