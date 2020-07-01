import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlDropdownComponent } from './form-control-dropdown.component';

describe('FormControlDropdownComponent', () => {
  let component: FormControlDropdownComponent;
  let fixture: ComponentFixture<FormControlDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
