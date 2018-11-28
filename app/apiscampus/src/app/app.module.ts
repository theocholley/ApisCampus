import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ReportPageModule} from "../pages/reporting/reportSwarm/report/report.module";
import {MyReportsPage} from "../pages/reporting/reportList/my-reports/my-reports";
import {MyReportsPageModule} from "../pages/reporting/reportList/my-reports/my-reports.module";
import {InsectPickerPage} from "../pages/reporting/reportSwarm/insect-picker/insect-picker";
import {InsectPickerPageModule} from "../pages/reporting/reportSwarm/insect-picker/insect-picker.module";
import {ReportEditPage} from "../pages/reporting/reportList/report-edit/report-edit";
import {MapPage} from "../pages/beekeeper/map/map";
import {InformationsPage} from "../pages/beekeeper/informations/informations";
import {LoginPage} from "../pages/beekeeper/login/login";
import {ReportPage} from "../pages/reporting/reportSwarm/report/report";
import {CameraOrNotPage} from "../pages/reporting/reportSwarm/camera-or-not/camera-or-not";
import {CameraPage} from "../pages/reporting/reportSwarm/camera/camera";
import {CameraPageModule} from "../pages/reporting/reportSwarm/camera/camera.module";
import {CameraOrNotPageModule} from "../pages/reporting/reportSwarm/camera-or-not/camera-or-not.module";
import {Geolocation} from '@ionic-native/geolocation';
import {Server} from "../server/server"
import {Camera} from "@ionic-native/camera";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import {SignUpPage} from "../pages/beekeeper/sign-up/sign-up";
import {LogOrSignPage} from "../pages/beekeeper/log-or-sign/log-or-sign";
import {InformationsPageModule} from "../pages/beekeeper/informations/informations.module";



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReportEditPage,
    MapPage,
    LoginPage,
    SignUpPage,
    LogOrSignPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ReportPageModule,
    InsectPickerPageModule,
    CameraPageModule,
    CameraOrNotPageModule,
    InformationsPageModule,
    MyReportsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReportPage,
    MyReportsPage,
    ReportEditPage,
    MapPage,
    LoginPage,
    InformationsPage,
    InsectPickerPage,
    CameraPage,
    CameraOrNotPage,
    SignUpPage,
    LogOrSignPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Server,
    Geolocation,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
