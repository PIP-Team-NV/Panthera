import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountEditComponent } from './client-account-edit.component';
import { FormGroup, FormControl, Validators } from '@angular/forms'

describe('ClientAccountAccountEditComponent', () => {
  let component: ClientAccountEditComponent;
  let fixture: ComponentFixture<ClientAccountEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAccountEditComponent ]
     
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
