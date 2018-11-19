import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the ReportTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-tabs',
  templateUrl: 'report-tabs.html'
})
export class ReportTabsPage {

  reportRoot = 'ReportPage'
  myReportsRoot = 'MyReportsPage'


  constructor(public navCtrl: NavController) {}

}
