import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDebugInfoComponent } from './user-debug-info.component';

describe('UserDebugInfoComponent', () => {
  let component: UserDebugInfoComponent;
  let fixture: ComponentFixture<UserDebugInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDebugInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDebugInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
