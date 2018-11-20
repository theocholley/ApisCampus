import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Server} from "../../../server/server";

/**
 * Generated class for the ReportEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-edit',
  templateUrl: 'report-edit.html',
})


export class ReportEditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public server:Server) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportEditPage');
  }

}
