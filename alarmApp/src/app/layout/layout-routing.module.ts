import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlarmListsComponent } from './alarm-lists/alarm-lists.component';
import { SettingsComponent } from './settings/settings.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'alarm-lists',  component: AlarmListsComponent },
  { path: 'settings',  component: SettingsComponent },
  {
    path: "**",
    redirectTo: "/home"
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }
