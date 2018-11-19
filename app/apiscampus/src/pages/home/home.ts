import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ReportTabsPage} from "../reporting/report-tabs/report-tabs";
import {LoginPage} from "../beekeeper/login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToReport() {
    this.navCtrl.push(ReportTabsPage);
  }

  goToConnect() {
    this.navCtrl.push(LoginPage);
  }

}
