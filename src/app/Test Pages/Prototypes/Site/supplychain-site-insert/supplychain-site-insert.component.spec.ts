import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplychainSiteInsertComponent } from './supplychain-site-insert.component';

describe('SupplychainSiteInsertComponent', () => {
  let component: SupplychainSiteInsertComponent;
  let fixture: ComponentFixture<SupplychainSiteInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplychainSiteInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplychainSiteInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
