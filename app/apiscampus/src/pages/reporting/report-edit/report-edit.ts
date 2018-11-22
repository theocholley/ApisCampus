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

  item;
  county;
  date;
  hour;


  constructor(public navCtrl: NavController, public navParams: NavParams, public server:Server) {
    this.item = navParams.get('item');
    this.county = this.item.county;
    this.hour = this.item.hour;
    this.date = this.item.date;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportEditPage');
  }

  editChanges(){
    var req1= this.server.updateFeature(0,"f");
    var req2= this.server.updateHeight(0,"f");
    var req3 = this.server.updateDescription(0,"d");
  }

}
