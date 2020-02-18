import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLogDateRangeComponent } from './change-log-date-range.component';

describe('ChangeLogDateRangeComponent', () => {
  let component: ChangeLogDateRangeComponent;
  let fixture: ComponentFixture<ChangeLogDateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLogDateRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLogDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
