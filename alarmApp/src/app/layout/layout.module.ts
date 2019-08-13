import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DigiClockComponent } from './digi-clock/digi-clock.component';
import { MaterialModule } from './material-module';
import { AlarmListsComponent } from './alarm-lists/alarm-lists.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetAlarmComponent } from './alarm-lists/set-alarm/set-alarm.component';
import { AlarmCardsComponent } from './alarm-lists/alarm-cards/alarm-cards.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlarmRingComponent } from './alarm-ring/alarm-ring.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';
import { DoubleDigitPipe } from '../pipe/double-digit.pipe';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [LayoutComponent,HeaderComponent, FooterComponent, HomeComponent, DigiClockComponent, 
    AlarmListsComponent, SetAlarmComponent, AlarmCardsComponent, AlarmRingComponent, 
    SettingsComponent,DoubleDigitPipe],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule ,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutRoutingModule,
    HttpClientModule,
    MaterialModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    PerfectScrollbarModule,
    AccordionModule.forRoot(),
    MatRadioModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  exports: [
    LayoutComponent
  ],
  providers:[
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class LayoutModule { }
