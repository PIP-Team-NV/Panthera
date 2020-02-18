import { TestBed, inject } from '@angular/core/testing';

import { MetadataLibService } from './metadata-lib.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OAuthService, UrlHelperService } from 'angular-oauth2-oidc';

describe('MetadataLibService', () => {
  let service: MetadataLibService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MetadataLibService, OAuthService, UrlHelperService]
    });
    service = TestBed.get(MetadataLibService);
  });

  it('should create an instance', () => {
    expect(service).toBeDefined();
  });

  it('query function success', () => {
    service.setProperties('', '', true, '', '');
    service.query();
    service.subscribe(value => {
      expect(value.length).toBeGreaterThanOrEqual(0);
    })
  });

  it('getUIHint function success', () => {
    service.setProperties('', '', true, '', '');
    service.query();
    service.subscribe(value => {
      expect(service.getUIHint(value,'bPublic','DisplayName')).toEqual('Public');
      expect(service.getUIHint(value,'bPublic','columnWidth')).toEqual('150px');
      expect(service.getUIHint(value,'bPublic','filter')).toEqual('boolean');
      expect(service.getUIHint(value,'bPublic','filterControl')).toEqual('switch');
    })
  });

  it('getFieldAttributes function success', () => {
    service.setProperties('', '', true, '', '');
    service.query();
    service.subscribe(value => {
      service.getFieldAttributes(value,'dateAdded');
      // expect(service.getAttributes(value,'dateAdded','')).toEqual('options');
    })
  });


  it('getFieldAttribute function success', () => {
    service.setProperties('', '', true, '', '');
    service.query();
    service.subscribe(value => {
      service.getFieldAttribute(value,'dateAdded', 'Required');
      
    })
  });

  it('getFieldAttributeParam function success', () => {
    service.setProperties('', '', true, '', '');
    service.query();
    service.subscribe(value => {
      service.getFieldAttributeParam(value,'dateAdded', 'DisplayFormat','DateFormatString');
   
    })
  });

  it('getList function success', () => {
    service.setProperties('', '',
     true, '', '');
    service.query();
    service.subscribe(value => {
      expect(service.getList(value,'clientStatusId').length).toBeGreaterThan(0);
    })
  });
});
