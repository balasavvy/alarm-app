import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlarmStoresService } from 'src/app/services/alarm.storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  _Disablechecked: boolean = false;

  _disableAll: boolean;
  _theme: any;
  themeForm: FormGroup;
  disableForm: FormGroup;
  alarms: any;
  constructor(private toastr: ToastrService,private alarmStorage: AlarmStoresService, private formBuilder: FormBuilder) {
    this.alarmStorage.someProp.subscribe(res => {
      this.alarms = this.alarmStorage.alarm.length;
      let getSettings = this.alarmStorage.settings;

    });
  }

  ngOnInit() {
    let getSettings = this.alarmStorage.settings;

    this.themeForm = this.formBuilder.group({
      themeOptions: ['dark']
    });
    this.disableForm = this.formBuilder.group({
      disableOptions: false
    });
    if (getSettings) {
      this.themeForm.controls['themeOptions'].setValue(getSettings.theme);
      this.disableForm.controls['disableOptions'].setValue(getSettings.disableAll);

    }
    if (!this.alarms && getSettings) {
      let settingsObj = {
        disableAll: false,
        theme: this.themeForm.controls['themeOptions'].value
      }
      this.alarmStorage.settings = settingsObj
    }

  }

  disableAll(event) {
    this._theme = this.themeForm.controls['themeOptions'].value;
    if (event.checked) {
      this.alarmStorage.deactivateAll();
      this._disableAll = true;
      this.toastr.success('All Alarms are disabled!');
    } else {
      this._disableAll = false;
    }
    this.setStorage()
  }
  changeTheme(event) {
    this._theme = event.value;
    $('#clickWidget').removeClass();
    $('#clickWidget').addClass(this._theme)
    this._disableAll = this.disableForm.controls['disableOptions'].value;
    this.setStorage()
  }
  setStorage() {
    let settingsObj = {
      disableAll: this._disableAll,
      theme: this._theme
    }
    this.alarmStorage.settings = settingsObj
  }
  ngOnDestroy() {

  }
}
