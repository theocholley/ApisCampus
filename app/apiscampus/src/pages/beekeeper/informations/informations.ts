import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Height, Insect, Situation, Size} from "../../../utils/enums";
import {Server} from "../../../server/server";
import * as Constants from '../../../utils/constants';


@IonicPage()
@Component({
  selector: 'page-informations',
  templateUrl: 'informations.html',
})
export class InformationsPage {

  public mySituation = Situation;
  public myHeight = Height;
  public myInsect = Insect;
  public mySize = Size;

  private readonly idBeekeeper;
  private readonly idSwarm;
  private item;
  private isTreated;
  private hour: string;
  private date: string;
  private county: string;
  private feature: string;
  private height: string;
  private description: string;
  private size: string;
  private telNumber: number;
  private insectType: string;
  private pic: string;
  private idMyReservedSwarm: number;

  constructor(public navCtrl: NavController,
              public server: Server,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public toastCtrl: ToastController) {
    this.item = navParams.get('item');
    this.idBeekeeper = navParams.get('idBeekeeper');
    this.idMyReservedSwarm = navParams.get('idMyReservedSwarm');
    this.idSwarm = this.item.id;
    this.telNumber = this.item.numberObs;
    this.isTreated = this.item.isTreated;
    this.county = this.item.county;
    this.hour = this.item.hour;
    this.date = this.item.date;
    this.description = this.item.description;
    if (this.item.pic != 'noimg')
      this.pic = Constants.PATHPHP + '/api/upload/images/' + this.item.pic;
    else this.pic = this.item.pic;
    this.feature=this.item.feature;
    this.height=this.item.height;
    this.size=this.item.size;
    this.insectType=this.item.insectType;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationsPage');
  }

  public bookSwarm() {
    this.server.treat(this.idBeekeeper, this.idSwarm);
    this.presentAlertBook();
    this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
  }

  endBooking() {
    this.server.retrieve(this.idSwarm);
    this.presentToastEnd();
    this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
  }

  cancelBooking() {
    this.server.cancelReservation(this.idSwarm);
    this.presentToastCancel();
    this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
  }

  presentAlertBook() {
    let alert = this.alertCtrl.create({
      title: 'Essaim réservé!',
      subTitle: 'Vous avez 15h pour récupérer votre essaim, passé ce délai il redeviendra disponible',
      buttons: ['OK']
    });
    alert.present();
  }

  presentToastCancel() {
    let toast = this.toastCtrl.create({
      message: 'Votre réservation a bien été annulée, à bientôt!',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }

  presentToastEnd() {
    let toast = this.toastCtrl.create({
      message: 'Merci d\'avoir utilisé notre application, à bientôt!',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }
}
