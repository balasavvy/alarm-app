import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmListsComponent } from './alarm-lists.component';

describe('AlarmListsComponent', () => {
  let component: AlarmListsComponent;
  let fixture: ComponentFixture<AlarmListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
