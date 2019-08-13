import { Component, OnInit, Input, OnChanges, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/Constants';
import * as moment from 'moment';
import { AlarmStoresService } from 'src/app/services/alarm.storage.service';

@Component({
  selector: 'app-alarm-ring',
  templateUrl: './alarm-ring.component.html',
  styleUrls: ['./alarm-ring.component.css']
})
export class AlarmRingComponent implements OnInit, OnChanges {

  @ViewChild('alarmRing') alarmRing: ModalDirective;
  @Input("isAlarming") isAlarming;
  @Output() alarmDone: EventEmitter < any > = new EventEmitter();
  modalRef: BsModalRef;
  config = {
    keyboard: false,
    ignoreBackdropClick: true
  };
  quote: any;
  @Input() now: Date;
  @Input("alarmObject") alarmObject;
  constructor(private cdRef: ChangeDetectorRef, private httpClient: HttpClient,
    private modalService: BsModalService, private storage: AlarmStoresService, private constants: Constants, ) {}
  private BASE_URL: string = this.constants.quotesAPIUrl;
  currentTime: string = moment().format('HH:MM');
  ngOnInit() {

  }
  ngOnChanges() {
    this.init();
    this.cdRef.markForCheck();

  }
  init() {
    if (this.isAlarming) {
      this.renderAlarmRing()
    } else {
      if (this.modalRef) {
        this.modalRef.hide();
      }
    }
  }
  renderAlarmRing() {
    this.httpClient.get(`${this.constants.quotesAPIUrl}=inspire`).subscribe((res) => {
      if (res) {
        this.quote = res['contents'].quotes[0].quote;
        if (this.modalRef) {
          this.modalRef.hide();
        }
        this.modalRef = this.modalService.show(this.alarmRing, this.config);
      }
    });
  }
  hide() {
    console.log(this.modalRef)
  }
  onSubmit(data) {
    this.modalRef.hide();
    if (data) {
      let obj = {
        alarmObject: this.alarmObject
      }
      this.alarmDone.emit(obj);
      this.storage.someProp.next('some value1');
    }
  }
}
