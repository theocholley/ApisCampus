import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {InsectPickerPage} from "../pages/reporting/insect-picker/insect-picker";
import {MapPage} from "../pages/beekeeper/map/map";
import {InformationsPage} from "../pages/beekeeper/informations/informations";
import {ReportPage} from "../pages/reporting/report/report";
import {CameraOrNotPage} from "../pages/reporting/camera-or-not/camera-or-not";
import {Geolocation} from '@ionic-native/geolocation';
import {Server} from "../server/server"
import {Camera} from "@ionic-native/camera";
import {SignUpPage} from "../pages/beekeeper/sign-up/sign-up";
import {LogOrSignPage} from "../pages/beekeeper/log-or-sign/log-or-sign";
import {InformationsPageModule} from "../pages/beekeeper/informations/informations.module";
import {UserInformationsPage} from "../pages/reporting/user-informations/user-informations";
import {UserInformationsPageModule} from "../pages/reporting/user-informations/user-informations.module";
import {Network} from "@ionic-native/network";
import {NativeStorage} from "@ionic-native/native-storage";
import {SettingsPage} from "../pages/reporting/settings/settings";
import {SettingsPageModule} from "../pages/reporting/settings/settings.module";
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import {HttpClientModule} from "@angular/common/http";
import {PictureCheckerPageModule} from "../pages/reporting/picture-checker/picture-checker.module";
import {PictureCheckerPage} from "../pages/reporting/picture-checker/picture-checker";
import {SignUpMapPage} from "../pages/beekeeper/sign-up-map/sign-up-map";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    CameraOrNotPage,
    InsectPickerPage,
    ReportPage,
    SignUpPage,
    SignUpMapPage,
    LogOrSignPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    InformationsPageModule,
    SettingsPageModule,
    PictureCheckerPageModule,
    HttpClientModule,
    UserInformationsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReportPage,
    MapPage,
    PictureCheckerPage,
    InformationsPage,
    InsectPickerPage,
    CameraOrNotPage,
    SettingsPage,
    SignUpPage,
    SignUpMapPage,
    LogOrSignPage,
    UserInformationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Server,
    File,
    Geolocation,
    Camera,
    Network,
    FileTransfer,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {
}
