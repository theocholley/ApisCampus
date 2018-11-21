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

  editChanges(){
    var req2 = this.server.updateLatitude(0, "updatedLatitude");
    var req3= this.server.updateDate(0,"datee");
    var req4 = this.server.updateHour(0,"h");
    var req5= this.server.updateFeature(0,"f");
    var req6 = this.server.updateDescription(0,"d");
  }

}
