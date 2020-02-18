import { Component, OnInit } from '@angular/core';
import { ChangeLogTipService } from '../change-log-tip.service';

@Component({
  selector: 'fcid-change-log-date-range',
  templateUrl: './change-log-date-range.component.html',
  styleUrls: ['./change-log-date-range.component.scss']
})
export class ChangeLogDateRangeComponent implements OnInit {
  constructor(private changeLogTipService : ChangeLogTipService) { }

  public showDateRange : boolean = false;

  private _end;
  public get end() {
    return this._end;
  } 

  public set end(value) {
    this._end = value;
    this.changeLogTipService.dateEnd = this._end;
  }

  private _start;
  public get start() {
    return this._start;
  }

  public set start(value) {
    this._start = value;
    this.changeLogTipService.dateStart = this._start;
  } 

  public onChangeLogClick() {
    this.showDateRange = !this.showDateRange;
    this.end = undefined;
    this.start = undefined;
  }

  public onShowAllClick() {
    this.end = new Date(2200,0,1);
    this.start = new Date(1995,0,1);
  }

  public onClearClick() {
    this.end = undefined;
    this.start = undefined;
  }

  public onCloseClick() {
    this.end = undefined;
    this.start = undefined;
    this.showDateRange = false;
  }

  ngOnInit() {
  }

}
