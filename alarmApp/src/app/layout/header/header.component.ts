import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentTime: string = moment().format('dddd, MMMM Do YYYY');
  constructor() { }

  ngOnInit() {
  }

}
