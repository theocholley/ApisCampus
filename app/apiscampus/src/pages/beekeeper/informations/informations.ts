import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-informations',
  templateUrl: 'informations.html',
})
export class InformationsPage {

  private item;
  private hour;
  private date;
  private county;
  private feature;
  private height;
  private description;
  private size;
  private insectType;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.item = navParams.get('item');
    this.county = this.item.county;
    this.hour = this.item.hour;
    this.date = this.item.date;
    this.feature = this.item.feature;
    this.height = this.item.height;
    this.description = this.item.description;
    this.size = this.item.size;
    this.insectType = this.item.insectType;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationsPage');
  }

  public closeModal() {
    this.viewCtrl.dismiss();
  }

  public bookSwarm() {
    this.presentAlert()
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Essaim réservé!',
      subTitle: 'L\'essaim va disparaître de la carte pendant 15h',
      buttons: ['OK']
    });
    alert.present();
  }

}
