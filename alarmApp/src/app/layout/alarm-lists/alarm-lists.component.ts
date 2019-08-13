import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, Inject } from '@angular/core';
import { Alarm } from 'src/app/models/alarm.models';
import { Observable } from 'rxjs';
import { SetAlarmComponent } from './set-alarm/set-alarm.component';
import { AlarmStoresService } from 'src/app/services/alarm.storage.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-alarm-lists',
  templateUrl: './alarm-lists.component.html',
  styleUrls: ['./alarm-lists.component.css']
})
export class AlarmListsComponent implements OnInit, AfterContentInit {
  noAlarmLists: boolean;
  @ViewChild(SetAlarmComponent) private setAlarmComponent: SetAlarmComponent;
  public _alarms: Observable < Alarm[] > ;

  _hour: any;
  _minute: any;
  _days: any;
  openSetAlarm: boolean;
  _isAlarmLists: boolean = true;
  _alarmlist: {};
  _alaraArray: any = [];
  alarmListings: any[];
  _isEdit: boolean;
  _isDelete: boolean;

  constructor(private toastr: ToastrService,private alarmStorage: AlarmStoresService) {}

  ngOnInit() {
    this.noAlarmLists = true;
    this.alarmStorage.someProp.subscribe(res => {
      let getAlarms = this.alarmStorage.alarm;
      let currentHr = new Date().getHours();
      let currentmin = new Date().getMinutes();
      if (getAlarms && getAlarms.length) {
        this._isAlarmLists = true;
        getAlarms.forEach((obj, i) => {
          if (!obj.days.length) {
            if ((new Date(obj.dateValue).getHours() <= currentHr) && new Date(obj.dateValue).getMinutes() < currentmin) {
              obj.daysLabel = "Tomorrow"
            } else {
              obj.daysLabel = "Today"
            }
          }
        })
        this.alarmListings = [...getAlarms];

      }else{
        this._isAlarmLists = false;
      }
    })

  }
  addAlarm() {
    this._isEdit = false;
    this.setAlarmComponent.showModal('');
  }
  ngAfterContentInit(): void {
    this._hour = 0;
    this._minute = 0;
    this._days = [0, 1, 2, 3, 4, 5, 6];
  }

  renderLists(dataEvent) {
    this._alaraArray=[];
    if (dataEvent.type == 'add') {
      let hours = dataEvent.value.getHours() > 12 ? dataEvent.value.getHours() - 12 : dataEvent.value.getHours();
      hours = hours < 10 ? "0" + hours : hours;
      const alarm = new Alarm();
      alarm.hour = +hours;
      let minutes = dataEvent.value.getMinutes() < 10 ? "0" + dataEvent.value.getMinutes() : dataEvent.value.getMinutes();
      alarm.minute = +minutes;
      alarm.days = dataEvent.RepeatArray;
      alarm.daysLabel = dataEvent.daysLabel;
      alarm.repeatMode = dataEvent.repeatMode;
      alarm.isActive = true;
      alarm.meridian = (dataEvent.value.getHours() >= 12) ? "PM" : "AM";;
      alarm.isValidTime = true;
      alarm.dateValue = dataEvent.value;
      let getAlarms = this.alarmStorage.alarm || [];
      if (getAlarms.length) {
        getAlarms.push(alarm);
        this.alarmStorage.removeAlarm("alarm-app");
        this.alarmStorage.alarm = getAlarms;
        this.alarmListings = [...getAlarms];
        this.alarmStorage.someProp.next('some value1');
      } else {
        this._alarmlist = {
          ...alarm
        };
        this._alaraArray.push(this._alarmlist);
        this.alarmStorage.alarm = this._alaraArray;
        this.alarmListings = [...this._alaraArray];
        this.alarmStorage.someProp.next('some value1');
      }
      if (alarm) {
        this.noAlarmLists = false;
        this._isAlarmLists = true;
        this.toastr.success('Alarm Added Successfuly');
      }
    } else {
      this.updateAlarmHandler(dataEvent)
    }

  }
  updateAlarmHandler(dataEvent: any) {
    let editRow = this.alarmListings.filter(function (ele) {
      return ele.id == dataEvent.dataValue.id
    });
    this.alarmListings.forEach((obj, i) => {
      if (obj.id == editRow[0].id) {
        let hours = dataEvent.value.getHours() > 12 ? dataEvent.value.getHours() - 12 : dataEvent.value.getHours();
        hours = hours < 10 ? "0" + hours : hours;
        obj.hour = +hours;
        let minutes = dataEvent.value.getMinutes() < 10 ? "0" + dataEvent.value.getMinutes() : dataEvent.value.getMinutes();
        obj.minute = +minutes;
        obj.days = dataEvent.RepeatArray; //repeat/today/tmrw 
        obj.daysLabel = dataEvent.daysLabel;
        obj.repeatMode = dataEvent.repeatMode;
        obj.isActive = true;
        obj.meridian = (dataEvent.value.getHours() >= 12) ? "PM" : "AM";
        obj.isValidTime = true;
        obj.dateValue = dataEvent.value;
      }
    });
    this.alarmStorage.alarm = this.alarmListings;
    this.alarmStorage.someProp.next('some value1');
    this.toastr.success('Alarm Updated Successfuly');
  }
  _editAlarm(data) {
    if (data) {
      this._isEdit = true;
      this.setAlarmComponent.showModal(data);
    }
  }
  _deleteAlarm(data) {
    if (data) {
      this._isEdit = false;
      this._isDelete = true;
      this.deleteAlarmHandler(data)
    }
  }
  _changeStatus(data) {
    if (data) {
      this.updateStatushandler(data);
    }
  }
  updateStatushandler(data: any) {
    let alarmData = data.alarmObj;
    let status = data.status;
    let getAlarms = this.alarmStorage.alarm;
    getAlarms.forEach((obj, i) => {
      if (obj.id == alarmData.id) {
        obj.isActive = status;
      }
    });
    this.alarmStorage.alarm = [...getAlarms];
  }
  deleteAlarmHandler(data: any) {
    const alarmListings = JSON.parse(JSON.stringify(this.alarmListings));
    let except = alarmListings.filter(function (x) {
      return x.id !== data.id;
    });
    this.alarmListings = [...except];
    this.alarmStorage.alarm = this.alarmListings;
    this.alarmStorage.someProp.next('some value1');
    if(!this.alarmStorage.alarm.length){
      this._isAlarmLists  =false
    }
  }
}
