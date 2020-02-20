import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MetadataLibService, KVP } from '../../Metadata/metadata-lib.service';

@Component({
  selector: 'fcid-foreignkey-field-control',
  templateUrl: './foreignkey-field-control.component.html',
  styleUrls: ['./foreignkey-field-control.component.css']
})
export class ForeignkeyFieldControlComponent implements OnInit {
  @Input('value')
  value?: any;
  list: KVP[] = [];
  coreItemName: string;

  constructor() { }

  public ngOnInit(): void {
  }

  public transform(input: any[], coreItemId?: any): any {
    if (!input) return;
    var outResult = input.find(c => c.key == coreItemId);
    return outResult ? outResult.value.val : null;
  }
}
