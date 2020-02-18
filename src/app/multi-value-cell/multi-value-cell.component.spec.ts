import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiValueCellComponent } from './multi-value-cell.component';

describe('MultiValueCellComponent', () => {
  let component: MultiValueCellComponent;
  let fixture: ComponentFixture<MultiValueCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiValueCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiValueCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
