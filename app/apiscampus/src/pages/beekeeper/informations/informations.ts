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
    this.getFeature(this.item.feature);
    this.getHeight(this.item.height);
    this.getSize(this.item.size);
    this.getInsect(this.item.insectType);
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

  getFeature(feature) {
    switch (feature) {
      case "Roof": {
        this.feature = this.mySituation.Roof.valueOf();
        break;
      }
      case "Wall": {
        this.feature = this.mySituation.Wall.valueOf();
        break;
      }
      case "Lamp": {
        this.feature = this.mySituation.Lamp.valueOf();
        break;
      }
      case "Tree": {
        this.feature = this.mySituation.Tree.valueOf();
        break;
      }
      case "Other": {
        this.feature = this.mySituation.Other.valueOf();
        break;
      }
      default: {
        this.feature = this.mySituation.Unknown.valueOf();
        break;
      }
    }
  }

  getHeight(height) {
    switch (height) {
      case "Ground": {
        this.height = this.myHeight.Ground.valueOf();
        break;
      }
      case "HumanSize": {
        this.height = this.myHeight.HumanSize.valueOf();
        break;
      }
      case "TwoToFive": {
        this.height = this.myHeight.TwoToFive.valueOf();
        break;
      }
      case "MoreThanFive": {
        this.height = this.myHeight.MoreThanFive.valueOf();
        break;
      }
      default: {
        this.height = this.myHeight.Unknown.valueOf();
        break;
      }
    }
  }

  getSize(size) {
    switch (size) {
      case "Tennis": {
        this.size = this.mySize.Tennis.valueOf();
        break;
      }
      case "Handball": {
        this.size = this.mySize.Handball.valueOf();
        break;
      }
      case "Basket": {
        this.size = this.mySize.Basket.valueOf();
        break;
      }
      default: {
        this.size = this.mySize.Unknown.valueOf();
        break;
      }
    }
  }

  getInsect(insect) {
    switch (insect) {
      case "Bee": {
        this.insectType = this.myInsect.Bee.valueOf();
        break;
      }
      case "Wasp": {
        this.insectType = this.myInsect.Wasp.valueOf();
        break;
      }
      case "Hornet": {
        this.insectType = this.myInsect.Hornet.valueOf();
        break;
      }
      default: {
        this.insectType = this.myInsect.Bee.valueOf();
        break;
      }
    }
  }

}
