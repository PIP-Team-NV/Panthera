import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectFilterControlComponent } from './multiselect-filter-control.component';

describe('MultiselectFilterControlComponent', () => {
  let component: MultiselectFilterControlComponent;
  let fixture: ComponentFixture<MultiselectFilterControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectFilterControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectFilterControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
