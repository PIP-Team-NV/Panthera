import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLogPopupListComponent } from './change-log-popup-list.component';

describe('ChangeLogPopupListComponent', () => {
  let component: ChangeLogPopupListComponent;
  let fixture: ComponentFixture<ChangeLogPopupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLogPopupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLogPopupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
