import { Component, OnInit, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlMetadata, lCI, KVP, MetadataLibService } from 'metadata-lib-fcid';

@Component({
  selector: 'fcid-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ListComponent),
    multi: true
  }
  ]
})
export class ListComponent implements OnInit, ControlValueAccessor, ControlMetadata {
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
  @Input('orderby')
  orderby: string = 'asc';
  @ViewChild("list") list;
  @Input() required: any;
  @Input() width: any;
  @Input() maxNoSelection: any;
  @Input() filterValue: any;
  propagateChange = (_: any) => { };

  constructor(private metadataLibService: MetadataLibService) { }

  ngOnInit() {

    if (this.fieldMetadata != undefined) {
      this.data = MetadataLibService.getList(this.fieldMetadata);
      this.PrepareData();
    }
    let Readonly = (this.readonly) ? this.readonly : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'readonly'); //need dynamic value
    this.readonly = Readonly === "false" ? false : true;
    this.width = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'width');
    this.maxNoSelection = parseInt((this.maxNoSelection) ? this.maxNoSelection : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'maxNoSelection'));
    this.filterValue = parseInt((this.filterValue) ? this.filterValue : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'filterValue'));
    this.required = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'required') == "true" ? true : false;
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
        this.listCoreItems = this.listCoreItemsBackup.filter((item) => {
          return item.coreItemValue.toLowerCase().indexOf(x.toLowerCase()) > -1;
        });
      });
  }

  handleFilterEvent(value) {
    if (value.length >= this.filterValue) {
      this.listCoreItems = this.listCoreItems.filter((s) => s.coreItemValue.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    } else {
      //this.multiselect.toggle(false);
    }
  }

  public value: any = [];

  public isItemSelected(itemText: string): boolean {
    return this.value.some(item => item.coreItemValue === itemText);
  }

  public handleValue(selected) {
    if (selected.length <= this.maxNoSelection) {
      this.value = selected;
    } else {
      this.value = this.value.map(item => item);
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
