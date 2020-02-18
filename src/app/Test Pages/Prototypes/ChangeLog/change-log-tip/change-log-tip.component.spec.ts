import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLogTipComponent } from './change-log-tip.component';

describe('ChangeLogTipComponent', () => {
  let component: ChangeLogTipComponent;
  let fixture: ComponentFixture<ChangeLogTipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLogTipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLogTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
