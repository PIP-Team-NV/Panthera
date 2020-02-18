import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplychainSiteEditComponent } from './supplychain-site-edit.component';

describe('SupplychainSiteEditComponent', () => {
  let component: SupplychainSiteEditComponent;
  let fixture: ComponentFixture<SupplychainSiteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplychainSiteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplychainSiteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
