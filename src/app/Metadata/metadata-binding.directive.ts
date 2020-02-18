import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { MetadataLibService } from './metadata-lib.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[fcidMetadataBinding]',
  providers: [MetadataLibService]
})
export class MetadataBindingDirective implements OnInit, OnDestroy {
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
  
  constructor(private metadataLibService: MetadataLibService) { 
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._serviceSubscription = this.metadataLibService.subscribe((result) => {
    });
    this.rebind();
  }

  private rebind(): void {
    this.metadataLibService.setProperties(this.doamin, this.context, this.isTest, this.serviceUrl, this.apiVersion);
    this.metadataLibService.query();
  }

  ngOnDestroy(): void {
    if (this._serviceSubscription) {
      this._serviceSubscription.unsubscribe();
    }
  }
}
