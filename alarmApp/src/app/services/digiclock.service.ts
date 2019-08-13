import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval } from 'rxjs/internal/observable/interval';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DigiclockService {
  private _clock: Observable < Date > ;
  constructor() {
  }
  get clock(): Observable < Date > {
    return this._clock;
  }
  public runClock(): void {
    this._clock = interval(1000).pipe(
      map((x: number) => {
        return new Date();
      }));
  }

}
