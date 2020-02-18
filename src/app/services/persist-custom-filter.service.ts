import { Injectable } from '@angular/core';
import { FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root'
})
export class PersistCustomFilterService {
  // this service used to persist the custom filters values and its injected on the page level that use the grid. 
  public customFilters: Array<FilterDescriptor>;
  constructor() {
    this.customFilters = [];
  }

  public addFilter(filterDescriptor: FilterDescriptor): void {
    this.customFilters.push(filterDescriptor);
  }

  public removeFilter(filterDescriptor: FilterDescriptor): void {

    var index: number = this.customFilters.findIndex(x => x.field == filterDescriptor.field && x.operator == filterDescriptor.operator && x.value == filterDescriptor.value);
    if (index !== -1) {
      this.customFilters.splice(index, 1);
    }

  }

  public getFilters(): Array<FilterDescriptor> {
    return this.customFilters;
  }

  public setFilters(filters: Array<FilterDescriptor>) {
    this.customFilters = filters;

  }


}
