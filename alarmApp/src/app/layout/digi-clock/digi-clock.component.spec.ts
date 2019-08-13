import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigiClockComponent } from './digi-clock.component';

describe('DigiClockComponent', () => {
  let component: DigiClockComponent;
  let fixture: ComponentFixture<DigiClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigiClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigiClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
