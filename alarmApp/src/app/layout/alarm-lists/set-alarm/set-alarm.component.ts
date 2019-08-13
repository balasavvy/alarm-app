import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalService, ModalDirective, BsModalRef } from 'ngx-bootstrap';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-set-alarm',
  templateUrl: './set-alarm.component.html',
  styleUrls: ['./set-alarm.component.css']
})
export class SetAlarmComponent implements OnInit {
  @ViewChild('setAlarmModal') public setAlarmModal: ModalDirective;
  @Output() alarmDetail: EventEmitter < any > = new EventEmitter();
  _isEdit: boolean = false;
  editDatavalue: any;
  _repeatMode: boolean = false;
  _checked: boolean = false;
  repeatModeObject: any[] = [];
  isClicked = [];
  _preEditData: boolean;
  daysLabel: string;
  constructor(private formBuilder: FormBuilder) {
    this.alarmForm = this.formBuilder.group({
      mytime: [new Date()],
      repeatModeBox: [null]
    });
  }
  ismeridian: boolean = false;
  mytime: Date = new Date();
  alarmForm: FormGroup;

  ngOnInit() {
    this.alarmForm = this.formBuilder.group({
      mytime: [new Date()],
      repeatModeBox: [null]
    });
  }
  showModal(data) {

    if (data) {
      this._isEdit = true;
    } else {
      this._isEdit = false;
    }
    if (this._isEdit) {
      this.alarmForm.controls['mytime'].setValue(data.dateValue);
      this.editDatavalue = data;
      if (data.days.length) {
        this._preEditData = true;
        this._checked = true;
        this.toggleDays();
        this.repeatModeObject = [...data.days]
        data.days.forEach((obj, i) => {
          this.isClicked[obj] = true
        });

      }
    } else {
      this.alarmForm.controls['mytime'].setValue(new Date());
      this.editDatavalue = null;
    }
    this.setAlarmModal.show();
  }
  hideModal() {
    if (this.setAlarmModal) {
      this.setAlarmModal.hide();
      if (!this._preEditData) this.resetMode();
    }
  }
  resetMode() {
    this._repeatMode = false;
    this._checked = false;
    this.repeatModeObject = [];
  }
  get fields() {
    return this.alarmForm.controls;
  }
  onSubmit(event: any) {
    let dateValue = new Date(this.fields.mytime.value);
    let currentHr = new Date().getHours();
    let currentmin = new Date().getMinutes();
    this.daysLabel = '';
    if (!this._repeatMode)
      if ((dateValue.getHours() <= currentHr) && dateValue.getMinutes() < currentmin) {
        this.daysLabel = "Tomorrow"
      } else {
        this.daysLabel = "Today"
      }
    else if (this._repeatMode) {
      let dayObj = []
      this.repeatModeObject.sort().forEach((obj, i) => {
        let object = this.getDay(obj);
        dayObj.push(object);
      })
      this.daysLabel = dayObj.toString()
    }
    console.log(this.repeatModeObject);
    let timeobj = dateValue.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    this.setAlarmModal.hide();
    let alarmType = this._isEdit ? "edit" : "add";
    let dataEmit = {
      type: alarmType,
      value: dateValue,
      dataValue: this.editDatavalue,
      RepeatArray: this.repeatModeObject,
      repeatMode: this._repeatMode,
      daysLabel: this.daysLabel
    }
    this.alarmDetail.emit(dataEmit)
  }
  getDay(day) {
    let $day = this.Days.filter(function (x) {
      return x.value == day;
    });
    return $day[0].day
  }
  repeatMode(event) {
    console.log(event);
    let status = event.checked;

    if (status) {
      this._checked = true;
      this.toggleDays()
    } else {
      this._checked = false;
      this._repeatMode = false;
      this.repeatModeObject = [];
      this.isClicked = []
    }

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
  toggleDays() {
    this._repeatMode = true;
  }
  addintoRepeatMode(data, event) {
    this.isClicked[data.value] = (this.isClicked[data.value] ? false : true)
    if (this.isClicked[data.value]) {
      this.repeatModeObject.push(data.value);
    } else {
      var index = this.repeatModeObject.indexOf(data.value);
      if (index > -1) {
        this.repeatModeObject.splice(index, 1);
      }
    }



  }
}
