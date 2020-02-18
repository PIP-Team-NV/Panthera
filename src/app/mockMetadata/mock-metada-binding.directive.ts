import { Directive, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetadataLibService } from 'metadata-lib-fcid';
import { MockMetadataService } from './mock-metadata.service';
import { MetadataServiceService } from '../services/metadata-service.service';

@Directive({
  selector: '[fcidMockMetaDataBinding]'
})
export class MockMetadaBindingDirective implements OnInit, OnDestroy {

  private _serviceSubscription: Subscription;
  @Input('domain')
  doamin: string = '';
  @Input('context')
  context: string = '';
  @Input('serviceUrl')
  serviceUrl: string = '';
  @Input('apiVersion')
  apiVersion: string = '';
  @Input('isTest')
  isTest: boolean = false;
  mockData= [];

  constructor(private metadataLibService: MetadataLibService, private mockMetadataService: MockMetadataService, private metadataService: MetadataServiceService ) {
  }
 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    debugger;
    this._serviceSubscription = this.metadataLibService.subscribe((result) => {
      console.log(result);
    });
    this.metadataService.getTestJSON().subscribe(data => {
      this.mockData = data;
      this.rebind();
    });
    // this.metadataService.getClientEditJSON().subscribe(data => {
    //   this.mockData = data;
    //   this.rebind();
    // });
    
  } 

  private rebind(): void {
    this.mockMetadataService.setProperties(this.doamin, this.context, this.isTest, this.serviceUrl, this.apiVersion);
    this.mockMetadataService.getQueryData(this.mockData);
  }

  ngOnDestroy(): void {
    if (this._serviceSubscription) {
      this._serviceSubscription.unsubscribe();
    }
  }

}
