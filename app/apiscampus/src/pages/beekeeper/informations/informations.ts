import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Height, Insect, Situation, Size} from "../../../utils/enums";


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

  private item;
  private hour;
  private date;
  private county;
  private feature;
  private height;
  private description;
  private img;
  private size;
  private insectType;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.item = navParams.get('item');
    this.county = this.item.county;
    this.hour = this.item.hour;
    this.date = this.item.date;
    this.description = this.item.description;
    this.img = this.item.img;
    this.getFeature(this.item.feature);
    this.getHeight(this.item.height);
    this.getSize(this.item.size);
    this.getInsect(this.item.insectType);
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

  getFeature(feature){
    switch(feature) {
      case "Roof": {
        this.feature=this.mySituation.Roof.valueOf();
        break;
      }
      case "Wall": {
        this.feature=this.mySituation.Wall.valueOf();
        break;
      }
      case "Lamp": {
        this.feature=this.mySituation.Lamp.valueOf();
        break;
      }
      case "Tree": {
        this.feature=this.mySituation.Tree.valueOf();
        break;
      }
      case "Other": {
        this.feature=this.mySituation.Other.valueOf();
        break;
      }
      default: {
        this.feature=this.mySituation.Unknown.valueOf();
        break;
      }
    }
  }

  getHeight(height){
    switch(height) {
      case "Ground": {
        this.height=this.myHeight.Ground.valueOf();
        break;
      }
      case "HumanSize": {
        this.height=this.myHeight.HumanSize.valueOf();
        break;
      }
      case "TwoToFive": {
        this.height=this.myHeight.TwoToFive.valueOf();
        break;
      }
      case "MoreThanFive": {
        this.height=this.myHeight.MoreThanFive.valueOf();
        break;
      }
      default: {
        this.height=this.myHeight.Unknown.valueOf();
        break;
      }
    }
  }

  getSize(size){
    switch(size) {
      case "Tennis": {
        this.size=this.mySize.Tennis.valueOf();
        break;
      }
      case "Handball": {
        this.size=this.mySize.Handball.valueOf();
        break;
      }
      case "Basket": {
        this.size=this.mySize.Basket.valueOf();
        break;
      }
      default: {
        this.size=this.mySize.Unknown.valueOf();
        break;
      }
    }
  }

  getInsect(insect){
    switch(insect) {
      case "Bee": {
        this.insectType=this.myInsect.Bee.valueOf();
        break;
      }
      case "Wasp": {
        this.insectType=this.myInsect.Wasp.valueOf();
        break;
      }
      case "Hornet": {
        this.insectType=this.myInsect.Hornet.valueOf();
        break;
      }
      default: {
        this.insectType=this.myInsect.Bee.valueOf();
        break;
      }
    }
  }

}
