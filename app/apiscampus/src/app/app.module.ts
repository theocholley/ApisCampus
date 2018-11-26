import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ReportPageModule} from "../pages/reporting/report/report.module";
import {MyReportsPage} from "../pages/reporting/my-reports/my-reports";
import {MyReportsPageModule} from "../pages/reporting/my-reports/my-reports.module";
import {ReportPhotoPageModule} from "../pages/reporting/report-photo/report-photo.module";
import {ReportPhotoPage} from "../pages/reporting/report-photo/report-photo";
import {ReportEditPage} from "../pages/reporting/report-edit/report-edit";
import {MapPage} from "../pages/beekeeper/map/map";
import {InformationsPage} from "../pages/beekeeper/informations/informations";
import {LoginPage} from "../pages/beekeeper/login/login";
import {ReportPage} from "../pages/reporting/report/report";

import {Geolocation} from '@ionic-native/geolocation';
import {Server} from "../server/server"
import {InsectPickerPage} from "../pages/reporting/insect-picker/insect-picker";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReportEditPage,
    MapPage,
    LoginPage,
    InformationsPage,
    InsectPickerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ReportPageModule,
    ReportPhotoPageModule,
    MyReportsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReportPage,
    MyReportsPage,
    ReportEditPage,
    ReportPhotoPage,
    MapPage,
    LoginPage,
    InformationsPage,
    InsectPickerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Server,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
