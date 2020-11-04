import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveLengthTimeInputComponent } from './reactive-length-time-input.component';

describe('ReactiveLengthTimeInputComponent', () => {
  let component: ReactiveLengthTimeInputComponent;
  let fixture: ComponentFixture<ReactiveLengthTimeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveLengthTimeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveLengthTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
