declare var require: any;
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Server} from "../../../server/server";
import {Geolocation} from '@ionic-native/geolocation';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  long;
  lat;
  date;
  hour;
  feature;
  description;
  height;
  featureForm;
  heightForm;
  descriptionForm;
  county;
  public now: Date = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams, public server: Server, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  addS() {
    this.feature=this.featureForm;
    this.height=this.heightForm;
    this.date=this.now.getDate()+"-"+this.now.getMonth()+"-"+this.now.getFullYear();
    this.hour=this.now.getTime();
    this.description=this.descriptionForm;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude.toString();
      this.long = resp.coords.longitude.toString();
      this.county = this.getCounty(this.lat, this.long);
      var req = this.server.addSwarm(this.long,this.lat,this.date,this.hour,this.feature,this.height,this.description);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  getCounty(lat, long) {
    var county = "undefined";
    var req = new XMLHttpRequest();
    req.open("GET", "https://nominatim.openstreetmap.org/reverse?format=xml&lat="+lat+"&lon="+long+"&zoom=18&addressdetails=1", false);
    req.send(null);
    let parseString = require('xml2js').parseString;
    let xml = req.responseText
    parseString(xml, function (err, result) {
      var jsonResult = JSON.parse(JSON.stringify(result));
      county = jsonResult.reversegeocode.addressparts[0].county;
    });
    return county;
  }
}
