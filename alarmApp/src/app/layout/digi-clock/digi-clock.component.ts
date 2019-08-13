import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-digi-clock',
  templateUrl: './digi-clock.component.html',
  styleUrls: ['./digi-clock.component.css']
})
export class DigiClockComponent implements OnInit {
@Input() now :Date;
  constructor() { }

  ngOnInit() {
  }

}
