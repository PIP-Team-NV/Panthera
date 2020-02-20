import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDecimalControlComponent } from './form-decimal-control.component';

describe('FormDecimalControlComponent', () => {
  let component: FormDecimalControlComponent;
  let fixture: ComponentFixture<FormDecimalControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDecimalControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDecimalControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
