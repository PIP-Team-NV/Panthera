import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreCascadeComponent } from './core-cascade.component';

describe('CoreCascadeComponent', () => {
  let component: CoreCascadeComponent;
  let fixture: ComponentFixture<CoreCascadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreCascadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreCascadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
