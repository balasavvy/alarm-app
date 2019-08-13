import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmCardsComponent } from './alarm-cards.component';

describe('AlarmCardsComponent', () => {
  let component: AlarmCardsComponent;
  let fixture: ComponentFixture<AlarmCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
