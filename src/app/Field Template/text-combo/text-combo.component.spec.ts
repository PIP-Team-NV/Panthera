import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextComboComponent } from './text-combo.component';

describe('TextComboComponent', () => {
  let component: TextComboComponent;
  let fixture: ComponentFixture<TextComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
