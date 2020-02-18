import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ChangeLogModel } from './change-log-model';
import { Subscription, from } from 'rxjs';
import { groupBy, mergeMap, toArray, distinct } from 'rxjs/operators';

@Injectable()
export class ChangeLogTipService implements OnInit, OnDestroy{
  public serviceSubscription: Subscription;

  public dateStart : Date;
  public dateEnd : Date;

  private _data: ChangeLogModel[] = [];

  private _userList: ({"username", "shortname"})[] = [];

  public get userList() {
    return this._userList;
  }

  public get data() {
    if (this.dateStart == undefined && this.dateEnd == undefined)
      return [];
    else if (this.dateStart == undefined)
      return this._data.filter(cl => new Date(cl.date) < this.dateEnd);
    else if (this.dateEnd == undefined)
      return this._data.filter(cl => new Date(cl.date) > this.dateStart);      
    else
      return this._data.filter(cl => new Date(cl.date) > this.dateStart && new Date(cl.date) < this.dateEnd);
  }

  public set data(value) {
    this._data = value;
    this.createUserList(value);
  }

  public createUserList(value :ChangeLogModel[]) {    
    const source = from(value.map(item => item.user));
    const example = source.pipe(distinct(item => item), toArray());
    const subscribe = example.subscribe(val => {
      console.log(val);
      this._userList = val.map(user => ({"username": user, "shortname": user.substr(0, 2).toUpperCase()}));
      console.log(this._userList);
    });
  }

  public clearChangeLog() {
    this.dateStart = undefined;
    this.dateEnd = undefined;
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  public totalChanges(field: string) {
    return this.data.filter(cl => cl.property.toLowerCase() == field.toLowerCase()).length;
  }

  public getChanges(field: string) : ChangeLogModel[] {
    return this.data.filter(cl => cl.property.toLowerCase() == field.toLowerCase());
  }
}
