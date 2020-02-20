import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreImageComponent } from './core-image.component';

describe('CoreImageComponent', () => {
  let component: CoreImageComponent;
  let fixture: ComponentFixture<CoreImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
