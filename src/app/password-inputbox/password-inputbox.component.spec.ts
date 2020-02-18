import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInputboxComponent } from './password-inputbox.component';

describe('PasswordInputboxComponent', () => {
  let component: PasswordInputboxComponent;
  let fixture: ComponentFixture<PasswordInputboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordInputboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordInputboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
