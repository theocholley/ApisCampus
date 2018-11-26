import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../beekeeper/login/login";
import {ReportPhotoPage} from "../reporting/report-photo/report-photo";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToReport() {
    this.navCtrl.push(ReportPhotoPage);
  }

  goToConnect() {
    this.navCtrl.push(LoginPage);
  }

}
