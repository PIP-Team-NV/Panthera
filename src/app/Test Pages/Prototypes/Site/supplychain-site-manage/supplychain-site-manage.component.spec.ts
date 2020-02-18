import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplychainSiteManageComponent } from './supplychain-site-manage.component';

describe('SupplychainSiteManageComponent', () => {
  let component: SupplychainSiteManageComponent;
  let fixture: ComponentFixture<SupplychainSiteManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplychainSiteManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplychainSiteManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
