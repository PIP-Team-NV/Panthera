import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fcid-icon-field-control',
  templateUrl: './icon-field-control.component.html',
  styleUrls: ['./icon-field-control.component.css']
})
export class IconFieldControlComponent implements OnInit {

  @Input('value')
  value: any;
  troothyClass?: string;
  falsyClass?: string;

  private _serviceSubscription: Subscription;
  constructor() { }
  public ngOnInit(): void {
  }

}
