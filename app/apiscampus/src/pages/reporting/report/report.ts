import {NativeStorage} from "@ionic-native/native-storage";

import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform,
  ViewController
} from 'ionic-angular';
import {Server} from "../../../server/server";
import {Geolocation} from '@ionic-native/geolocation';
import {Situation, Height, Size} from "../../../utils/enums";
import {Network} from "@ionic-native/network";


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
  private telNumber;
  private insect;
  private feature;
  private description;
  private height;
  private size;
  private img;

  constructor(private nativeStorage: NativeStorage,
              public platform: Platform,
              public network: Network,
              public navCtrl: NavController,
              private alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public server: Server,
              private geolocation: Geolocation) {
    this.date = navParams.get('date');
    this.hour = navParams.get('hour');
    this.insect = navParams.get('insect');
    this.img = navParams.get('img');
    this.telNumber = navParams.get('telNumber');
    this.platform.ready().then(() => {
      if (this.network.type == "none") {
        this.presentNetworkIssueInfoAlert();
      }
    });
  }

  public closeModal() {
    this.viewCtrl.dismiss();
    let data = {date: this.date, hour: this.hour};
    let modalPage = this.modalCtrl.create('InsectPickerPage', data);
    modalPage.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  addSwarm() {
    this.platform.ready().then(() => {
      if (this.network.type == "none") {
        this.addSwarmNotConnected()
      }
      else {
        this.addSwarmConnected()
      }
    });
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

  presentNetworkIssueAlert() {
    let alert = this.alertCtrl.create({
      title: 'Merci!',
      subTitle: 'Votre signalement est enregistré hors connexion, n\'oubliez pas ' +
        'd\'ouvir à nouveau l\'application lorsque vous avez une connexion internet disponible!',
      buttons: ['OK']
    });
    alert.present();
  }

  presentNetworkIssueInfoAlert() {
    let alert = this.alertCtrl.create({
      title: 'Oups!',
      subTitle: 'Il semblerait que vous ne soyez pas connecté à internet! Pour que votre signalement puisse ' +
        'être vu par des apiculteurs, il vous faut activer vos données mobiles ou votre wifi. Si vous êtes dans ' +
        'un lieu ou vous n\'avez pas de connexion ce n\'est pas grave, il vous suffit de faire votre signalement et ' +
        'de simplement réouvrir l\'application dans un lieu où vous avez internet!',
      buttons: ['OK']
    });
    alert.present();
  }

  addSwarmConnected() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude.toString();
      this.long = resp.coords.longitude.toString();
      this.server.addSwarm(this.long, this.lat, this.date, this.hour, this.feature, this.height, this.description, this.telNumber, this.size, this.insect, this.img);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    this.presentAlert();
  }

  addSwarmNotConnected() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude.toString();
      this.long = resp.coords.longitude.toString();
      this.nativeStorage.setItem('request',
        {
          lat: this.lat,
          long: this.long,
          date: this.date,
          hour: this.hour,
          feature: this.feature,
          height: this.height,
          description: this.description,
          telNumber: this.telNumber,
          size: this.size,
          insect: this.insect,
          img: this.img
        })
        .then(
          () => console.log('Stored request!'),
          error => console.error('Error storing item', error)
        );
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    this.presentNetworkIssueAlert();
  }

}
