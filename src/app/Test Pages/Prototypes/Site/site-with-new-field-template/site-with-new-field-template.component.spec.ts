import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteWithNewFieldTemplateComponent } from './site-with-new-field-template.component';

describe('SiteWithNewFieldTemplateComponent', () => {
  let component: SiteWithNewFieldTemplateComponent;
  let fixture: ComponentFixture<SiteWithNewFieldTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteWithNewFieldTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteWithNewFieldTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
