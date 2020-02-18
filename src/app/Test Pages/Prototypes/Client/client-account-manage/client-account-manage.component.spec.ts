import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountManageComponent } from './client-account-manage.component';

describe('ClientAccountAccountManageComponent', () => {
  let component: ClientAccountManageComponent;
  let fixture: ComponentFixture<ClientAccountManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAccountManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccountManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
