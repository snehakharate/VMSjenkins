import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VverifyComponent } from './vverify.component';

describe('VverifyComponent', () => {
  let component: VverifyComponent;
  let fixture: ComponentFixture<VverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VverifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
