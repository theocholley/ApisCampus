import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Server} from "../../../../server/server";
import {Geolocation} from '@ionic-native/geolocation';
import {Situation, Height, Size} from "../../../../utils/enums";



@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  public mySituation = Situation;
  public myHeight = Height;
  public mySize = Size;

  private long;
  private lat;
  private readonly date;
  private readonly hour;
  private readonly county;
  private insect;
  private feature;
  private description;
  private height;
  private size;

  private featureForm;
  private heightForm;
  private sizeForm;
  private descriptionForm;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController, public navParams: NavParams, public server: Server, private geolocation: Geolocation) {
    this.date = navParams.get('date');
    this.hour = navParams.get('hour');
    this.county = navParams.get('county');
    this.insect = navParams.get('insect');
  }

  public closeModal() {
    this.viewCtrl.dismiss();
    var data = {date: this.date, hour: this.hour, county: this.county};
    var modalPage = this.modalCtrl.create('InsectPickerPage', data);
    modalPage.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  addSwarm() {
    this.feature = this.featureForm;
    this.height = this.heightForm;
    this.description = this.descriptionForm;
    this.size = this.sizeForm;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude.toString();
      this.long = resp.coords.longitude.toString();
      this.server.addSwarm(this.long, this.lat, this.date, this.hour, this.feature, this.height, this.description, this.county, "nbObs", this.size, this.insect, "picture");
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
