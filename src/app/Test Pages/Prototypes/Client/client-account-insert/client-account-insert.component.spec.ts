import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountInsertComponent } from './client-account-insert.component';

describe('ClientAccountInsertComponent', () => {
  let component: ClientAccountInsertComponent;
  let fixture: ComponentFixture<ClientAccountInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAccountInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccountInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
