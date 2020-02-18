import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFieldtemplateComponent } from './test-fieldtemplate.component';

describe('TestFieldtemplateComponent', () => {
  let component: TestFieldtemplateComponent;
  let fixture: ComponentFixture<TestFieldtemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFieldtemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFieldtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
