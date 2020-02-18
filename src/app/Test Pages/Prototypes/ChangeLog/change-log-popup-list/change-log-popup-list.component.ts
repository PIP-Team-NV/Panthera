import { Component, OnInit, Input } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ChangeLogModel } from '../change-log-model';

@Component({
  selector: 'fcid-change-log-popup-list',
  templateUrl: './change-log-popup-list.component.html',
  styleUrls: ['./change-log-popup-list.component.scss']
})
export class ChangeLogPopupListComponent implements OnInit {

  @Input()
  public changes : ChangeLogModel[];

  constructor(private windowRef: WindowRef) { }

  ngOnInit() {
  }

  public onClose() {
    this.windowRef.close();
  }
}
