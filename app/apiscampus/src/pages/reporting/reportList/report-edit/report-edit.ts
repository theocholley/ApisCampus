import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Server} from "../../../../server/server";


@IonicPage()
@Component({
  selector: 'page-report-edit',
  templateUrl: 'report-edit.html',
})


export class ReportEditPage {

  private item;
  private county;
  private date;
  private hour;
  private featureForm;
  private heightForm;
  private sizeForm;
  private descriptionForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, public server: Server) {
    this.item = navParams.get('item');
    this.county = this.item.county;
    this.hour = this.item.hour;
    this.date = this.item.date;
    this.featureForm = this.item.feature;
    this.heightForm = this.item.height;
    this.sizeForm = this.item.size;
    this.descriptionForm = this.item.description;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportEditPage');
  }

  editChanges() {
    var req1 = this.server.updateFeature(0, "f");
    var req2 = this.server.updateHeight(0, "f");
    var req3 = this.server.updateDescription(0, "d");
  }

}
