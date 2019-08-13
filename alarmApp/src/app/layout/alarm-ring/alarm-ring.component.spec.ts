import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmRingComponent } from './alarm-ring.component';

describe('AlarmRingComponent', () => {
  let component: AlarmRingComponent;
  let fixture: ComponentFixture<AlarmRingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmRingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
