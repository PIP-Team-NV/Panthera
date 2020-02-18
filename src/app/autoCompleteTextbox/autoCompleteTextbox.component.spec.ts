import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteTextboxComponent } from './autoCompleteTextbox.component';

describe('AutoCompleteSiteComponent', () => {
  let component: AutoCompleteTextboxComponent;
  let fixture: ComponentFixture<AutoCompleteTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutoCompleteTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
