import { Component, OnInit, Input } from '@angular/core';
import { MetadataLibService, KVP } from 'metadata-lib-fcid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fcid-multi-value-cell',
  templateUrl: './multi-value-cell.component.html',
  styleUrls: ['./multi-value-cell.component.scss']
})
export class MultiValueCellComponent implements OnInit {
   _serviceSubscription: Subscription;
  @Input('value')
  value: any;
  @Input('field')
  field: string;
  data: KVP[];
  mulitValues: string = "";
  constructor(private metadataLibService: MetadataLibService) { }

  ngOnInit() {
    this._serviceSubscription = this.metadataLibService.subscribe((result) => {
      this.data = this.metadataLibService.getList(result, this.field);
      this.transform(this.data, this.value);
    })
  }

  public transform(input: any[], coreItemId?: any[]): void {
    if (!input) return;
    coreItemId.forEach(element => {
      var outResult = input.find(c => c.key == element);
      if (outResult.value.val && this.mulitValues! + "") {
         this.mulitValues = this.mulitValues + ", " + outResult.value.val; 
    } 
      else { this.mulitValues = outResult.value.val; }

    });
    //return this.mulitValues;

  }

}
