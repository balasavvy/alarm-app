import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alarm } from 'src/app/models/alarm.models';
@Component({
  selector: 'alarm-cards',
  templateUrl: './alarm-cards.component.html',
  styleUrls: ['./alarm-cards.component.css']
})
export class AlarmCardsComponent implements OnInit {
  @Input() alarms: Alarm[];
  @Output() _editAlarm: EventEmitter < any > = new EventEmitter();
  @Output() _deleteAlarm: EventEmitter < any > = new EventEmitter();
  @Output() _changeStatus: EventEmitter < any > = new EventEmitter();
  oneAtATime: boolean = true;
  constructor() {}

  ngOnInit() {

  }
  public Days = [{
      day: 'Sun',
      day_sh: 'S',
      value: 0,
      enable: false
    },
    {
      day: 'Mon',
      day_sh: 'M',
      value: 1,
      enable: false
    },
    {
      day: 'Tue',
      day_sh: 'T',
      value: 2,
      enable: false
    },
    {
      day: 'Wed',
      day_sh: 'W',
      value: 3,
      enable: false
    },
    {
      day: 'Thu',
      day_sh: 'T',
      value: 4,
      enable: false
    },
    {
      day: 'Fri',
      day_sh: 'F',
      value: 5,
      enable: false
    },
    {
      day: 'Sat',
      day_sh: 'S',
      value: 6,
      enable: false
    },
  ];
 
  editAlarm(alarm) {
    this._editAlarm.emit(alarm)
  }
  deleteAlarm(alarm) {
    this._deleteAlarm.emit(alarm)
  }
  statusChange(alarm, event) {
    let dataObj = {
      alarmObj: alarm,
      status: event.checked
    }
    this._changeStatus.emit(dataObj)
  }
}
