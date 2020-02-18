import { Component, OnInit, Input, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MetadataLibService,lCI,KVP } from 'metadata-lib-fcid';
import { BaseFilterCellComponent, FilterService } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fcid-multiselect-filter-control',
  templateUrl: './multiselect-filter-control.component.html',
  styleUrls: ['./multiselect-filter-control.component.scss']
})
export class MultiselectFilterControlComponent extends BaseFilterCellComponent  {
  @Input('data')
  data: KVP[];
  // @Input('filter')
  //  filter: CompositeFilterDescriptor;
  // @Input('filterService')
  // public filterService: FilterService;
  @Input('field')
  field: string;
  public defaultItem: Array<number>;
  listCoreItems: lCI[] = [];
  @Input('orderby')
  orderby: string = 'asc';
 @ViewChild('list')
 public list: TemplateRef<any>;
 private _serviceSubscription: Subscription;
  constructor(  filterService:FilterService,private metadataService:MetadataLibService) {
    super(filterService);
    
  }

  ngOnInit() {
    this._serviceSubscription = this.metadataService.subscribe((result) => {
      this.data = (!Array.isArray(this.data) || !this.data.length) ? this.metadataService.getList(result, this.field) : this.data;
      this.PrepareData();
    });
  this.listCoreItems= this.PrepareData();
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
    return this.listCoreItems;
  }

  
  public onChange(values: any): boolean {
   
      ///////////********** */this it will remove all rows on filter and Do get them back on hitting x
    // this.filterService.filter({
    //     filters: values.map(value => ({
    //         field: this.field,
    //         operator: 'eq',
    //         value:118278
    //     })),
    //     logic: 'or'
    // });


  //   this.filter = this.updateFilter({
  //     field: this.field,
  //     operator: "eq",
  //     value: 118278
  //   });

  //   this.filterService.filter(this.filter);
  // //}
     this.applyFilter(  {
      filters: values.map(value => ({
          field: this.field,
          operator: 'eq',
          value: parseInt(value.coreItemId)
      })),
      logic: 'or'
  })
  return true;
}



  ngOnDestroy() {
    try {
      if (this._serviceSubscription) {
        this._serviceSubscription.unsubscribe();
      } return true;
    }
    catch{ return false; }
  }


}
