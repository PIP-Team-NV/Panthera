import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcidHeaderComponent } from './fcid-header.component';

describe('FcidHeaderComponent', () => {
  let component: FcidHeaderComponent;
  let fixture: ComponentFixture<FcidHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcidHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcidHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
