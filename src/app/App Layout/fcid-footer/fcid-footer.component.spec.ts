import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcidFooterComponent } from './fcid-footer.component';

describe('FcidFooterComponent', () => {
  let component: FcidFooterComponent;
  let fixture: ComponentFixture<FcidFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcidFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcidFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
