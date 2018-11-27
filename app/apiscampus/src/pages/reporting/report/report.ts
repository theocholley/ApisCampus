import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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
  insect;
  feature;
  description;
  height;
  size;
  featureForm;
  heightForm;
  sizeForm;
  descriptionForm;
  county;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public viewCtrl : ViewController, public navParams: NavParams, public server: Server, private geolocation: Geolocation) {
    this.date = navParams.get('date');
    this.hour = navParams.get('hour');
    this.county = navParams.get('county');
    this.insect = navParams.get('insect');
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  addS() {
    this.feature=this.featureForm;
    this.height=this.heightForm;
    this.description=this.descriptionForm;
    this.size=this.sizeForm;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude.toString();
      this.long = resp.coords.longitude.toString();
      var req = this.server.addSwarm(this.long, this.lat, this.date, this.hour, this.feature, this.height, this.description, this.county, "nbObs",this.size, this.insect);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    this.presentAlert();
    this.viewCtrl.dismiss();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Merci!',
      subTitle: 'Votre signalement est mainentant visible!',
      buttons: ['OK']
    });
    alert.present();
  }



}
