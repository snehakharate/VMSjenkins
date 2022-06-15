import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatepassdetailsComponent } from './gatepassdetails.component';

describe('GatepassdetailsComponent', () => {
  let component: GatepassdetailsComponent;
  let fixture: ComponentFixture<GatepassdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatepassdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatepassdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
