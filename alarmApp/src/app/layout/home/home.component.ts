import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DigiclockService } from 'src/app/services/digiclock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private clockService: DigiclockService, ) {}
  get clock$(): Observable < Date > {
    return this.clockService.clock;
  }
  ngOnInit() {
    this.clockService.runClock();
  }

}
