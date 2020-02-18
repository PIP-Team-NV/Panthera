import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DateTimeComponent } from 'src/app/date-time/date-time.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ClientModule {

  id: number;
  name: string;
  legalName: string;
  website: string;
  dateAdded: Date;
  dateStatus: Date;
  bMfr: boolean;
  bRet: boolean;
  bSup: boolean;
  bDst: boolean;
  bPublic: boolean;
  bTest: boolean;
  bNGPVisible: boolean;
  bPmtOnline: boolean;
  bPtnrMktg: boolean;
  bDeleted:boolean;
  bFCEUMktg: boolean;
  bLockedOut: boolean;
  billingContact: number;
  billingLocation: number;
  clientStatusId: number;
  pcaSet: number;
  pmtDiscountId: number;
  pmtFeeScheduleId:number;
  pmtRemarkId: number;
  pmtStatusId: number;
  primaryRole: number;
  acctMgrUserId:number;
  appSet:number;
  clientCode:string;
  clientStatus:string;
  dataSrc:number;
  dateFormatId:number;
  locationId:number;
  modifiedByUserId:number;
  pmtDateDiscountExpires: Date;
  pmtRemarkText:string;
  primaryContactId:number;
  repId:number;
  sponsorId:number;
  sysEndTime:Date;
  sysStartTime:Date;
  timeZoneId:number;
  vatNum:string;








}
