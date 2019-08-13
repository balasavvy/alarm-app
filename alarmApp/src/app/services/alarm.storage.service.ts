import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AlarmStoresService {
    _alarm: any;
    public someProp  = new BehaviorSubject<any>(null);
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { 
    
  }
  deactivateThisAlarm(data){
    let alarmListings = JSON.parse(JSON.stringify( this.alarm ));
    alarmListings.forEach((obj, i) => {
     if(obj.id == data['alarmObject'].id){  
      obj.isActive = false;
     }
    });
  this.storage.set("alarm-app",[...alarmListings])
  }
  deactivateAll(){
    let getAlarm =this.alarm;
    if(getAlarm){
      getAlarm.forEach((obj, i) => {
        obj.isActive = false;
       });
       this.storage.set("alarm-app",[...getAlarm])
    }
  }
   get alarm(){
    return this.storage.get("alarm-app"); 
    }
    set alarm(alarm){
      this.storage.set("alarm-app",alarm)
    }
    removeAlarm(alarm){
    this.storage.remove(alarm)
    }
    clear(){
        this.storage.clear();
    }
    get settings(){
      return this.storage.get("alarm-settings"); 
      }
    set settings(setting){
      this.storage.set("alarm-settings",setting)
    }
}
