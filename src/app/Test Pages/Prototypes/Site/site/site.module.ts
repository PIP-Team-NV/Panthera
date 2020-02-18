import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SiteModule {
  siteId: number;
  siteName: string;
  clientId: number;
  clientName: string;
  bTest: boolean;
  dateAdded: Date;
  address1: string;
  address2: string;
  email: string;
  phone: string;
  fax: string;
  city: string;
  state: string;
  postalCode:string;
  country: string;
  siteType: string[];
  locationTypeSet: Array<number>;
  deleted: boolean;
  geoLat: number;
  geoLng: number;
  sanctionReport: boolean;
  siteStatusId: number;
  siteStatus: string;
  dateSiteStatus: Date;
  keyword: string;
  descr: string;
  contactId: number;
  formId: number;
  expedite: boolean;
  dateExpediteRequest: Date;
  priority: boolean;
  }
