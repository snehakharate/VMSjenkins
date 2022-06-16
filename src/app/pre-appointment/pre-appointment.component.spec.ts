import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAppointmentComponent } from './pre-appointment.component';

describe('PreAppointmentComponent', () => {
  let component: PreAppointmentComponent;
  let fixture: ComponentFixture<PreAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
