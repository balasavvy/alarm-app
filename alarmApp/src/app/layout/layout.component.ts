import { AfterContentInit ,Component, OnInit, ChangeDetectorRef, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { DigiclockService } from '../services/digiclock.service';
import { ClockValue, Alarm } from '../models/alarm.models';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { StorageService } from 'ngx-webstorage-service';
import { AlarmStoresService } from '../services/alarm.storage.service';
import * as $ from 'jquery';
import { AlarmRingComponent } from './alarm-ring/alarm-ring.component';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit,AfterContentInit,OnChanges,OnDestroy {
  public isAlarming = false;
  @ViewChild(AlarmRingComponent)
  private alarmRingComponent: AlarmRingComponent;
  private checkAlarmSub = Subscription.EMPTY;
  clockValue$: Observable<ClockValue>;
  alarmObject: Alarm;
  constructor(private cdRef: ChangeDetectorRef,private clockService: DigiclockService,private storage: AlarmStoresService ) { 

  }
  get clock$(): Observable<Date> {
    return this.clockService.clock;
  }
  get alarms$() {
    return this.storage.alarm;
  }
  ngOnInit() {
    this.storage.someProp.subscribe(res=>{
    let theme =this.storage.settings?this.storage.settings.theme:null;
    if(theme){
      $('#clickWidget').removeClass();
      $('#clickWidget').addClass(theme)
    }
  });
    this.clockService.runClock();
    this.clockValue$ = this.clock$.pipe(
            map(( moment: Date ) => {
                return {
                    hour: moment.getHours(),
                    minute: moment.getMinutes(),
                    day: moment.getDay(),
                };
            }),
            distinctUntilChanged(( m1: ClockValue, m2: ClockValue ) => {
                return m1.hour === m2.hour &&
                    m1.minute === m2.minute &&
                    m1.day === m2.day;
            })
        );
  }
  ngOnChanges() {
   // this.alarms$ = this.storage.alarm;
  }
  ngAfterContentInit(): void {
    if(this.alarms$){
      this.checkAlarmSub = combineLatest(this.clockValue$).pipe(
        map(( [clockValue] ) => this.checkAlarm(this.alarms$, clockValue)),
    ).subscribe(( alarm ) => {
        if(alarm){
          this.alarmObject = alarm;      
        }
          
        this.isAlarming = !!alarm;       
        this.cdRef.markForCheck();
      });
    }
      
    
   
}
alarmBellConfirm(data): void {
  this.isAlarming = false;
  if(data){
    this.deactivateAlarm(data);
    this.cdRef.markForCheck();
  }
  return;
}
  deactivateAlarm(data: any) {
    this.storage.deactivateThisAlarm(data);
  }
ngOnDestroy(): void {
  this.checkAlarmSub.unsubscribe();
}
private checkAlarm( alarms, clockValue: ClockValue ): Alarm | null {
  for (const alarm of alarms) {
      let hr= clockValue.hour > 12 ? clockValue.hour - 12 : clockValue.hour;
      if(alarm.repeatMode){
        //repeatMode
        if (alarm.hour === hr  &&
          alarm.minute === clockValue.minute &&
          alarm.days.indexOf(clockValue.day) > -1 &&
          alarm.isActive
          ) {
          return alarm;
      }

      }else{
        //no repeat
        if (alarm.hour === hr  &&
          alarm.minute === clockValue.minute &&
          alarm.isActive
          ) {
          return alarm;
      }
      }
      
  }

  return null;
}
}
