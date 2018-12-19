import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Height, Insect, Situation, Size} from "../../../utils/enums";
import {Server} from "../../../server/server";


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

  private idBeekeeper;
  private idSwarm;
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

  constructor(public navCtrl: NavController, public server: Server, public navParams: NavParams, private alertCtrl: AlertController, public viewCtrl: ViewController) {
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
      this.pic = 'http://192.168.1.21/api/upload/images/' + this.item.pic;
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
    let req = this.server.treat(this.idBeekeeper, this.idSwarm);
    this.presentAlertBook()
  }

  endBooking(){
    let req = this.server.cancelReservation(this.idSwarm);
    this.presentAlertEnd();
  }

  cancelBooking(){
    let req = this.server.cancelReservation(this.idSwarm);
    this.presentAlertCancel();
  }

  presentAlertBook() {
    let alert = this.alertCtrl.create({
      title: 'Essaim réservé!',
      subTitle: 'L\'essaim va disparaître de la carte pendant 15h',
      buttons: ['OK']
    });
    alert.present();
  }

  presentAlertCancel() {
    let alert = this.alertCtrl.create({
      title: 'Réservation annulée',
      subTitle: 'Votre réservation a bien été annulée',
      buttons: ['OK']
    });
    alert.present();
  }

  presentAlertEnd() {
    let alert = this.alertCtrl.create({
      title: 'Essaim récupéré',
      subTitle: 'Merci!',
      buttons: ['OK']
    });
    alert.present();
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
