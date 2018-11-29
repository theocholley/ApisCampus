import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ReportPageModule} from "../pages/reporting/report/report.module";
import {InsectPickerPage} from "../pages/reporting/insect-picker/insect-picker";
import {InsectPickerPageModule} from "../pages/reporting/insect-picker/insect-picker.module";
import {MapPage} from "../pages/beekeeper/map/map";
import {InformationsPage} from "../pages/beekeeper/informations/informations";
import {LoginPage} from "../pages/beekeeper/login/login";
import {ReportPage} from "../pages/reporting/report/report";
import {CameraOrNotPage} from "../pages/reporting/camera-or-not/camera-or-not";
import {CameraOrNotPageModule} from "../pages/reporting/camera-or-not/camera-or-not.module";
import {Geolocation} from '@ionic-native/geolocation';
import {Server} from "../server/server"
import {Camera} from "@ionic-native/camera";
import {SignUpPage} from "../pages/beekeeper/sign-up/sign-up";
import {LogOrSignPage} from "../pages/beekeeper/log-or-sign/log-or-sign";
import {InformationsPageModule} from "../pages/beekeeper/informations/informations.module";



@NgModule({
  declarations: [
    MyApp,
    HomePage,
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
    CameraOrNotPageModule,
    InformationsPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReportPage,
    MapPage,
    LoginPage,
    InformationsPage,
    InsectPickerPage,
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
