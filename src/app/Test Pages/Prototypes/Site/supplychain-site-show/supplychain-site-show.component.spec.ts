import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplychainSiteShowComponent } from './supplychain-site-show.component';

describe('SupplychainSiteShowComponent', () => {
  let component: SupplychainSiteShowComponent;
  let fixture: ComponentFixture<SupplychainSiteShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplychainSiteShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplychainSiteShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
