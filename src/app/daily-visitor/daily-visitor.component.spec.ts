import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyVisitorComponent } from './daily-visitor.component';

describe('DailyVisitorComponent', () => {
  let component: DailyVisitorComponent;
  let fixture: ComponentFixture<DailyVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyVisitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
