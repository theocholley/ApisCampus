import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InformationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informations',
  templateUrl: 'informations.html',
})
export class InformationsPage {

  item;
  hour;
  date;
  county;
  feature;
  height;
  description;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
    this.county = this.item.county;
    this.hour = this.item.hour;
    this.date = this.item.date;
    this.feature = this.item.feature;
    this.height = this.item.height;
    this.description = this.item.description;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationsPage');
  }

}
