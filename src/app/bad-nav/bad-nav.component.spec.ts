import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadNavComponent } from './bad-nav.component';

describe('BadNavComponent', () => {
  let component: BadNavComponent;
  let fixture: ComponentFixture<BadNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
