import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {ReportPage} from "../report/report";

/**
 * Generated class for the InsectPickerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insect-picker',
  templateUrl: 'insect-picker.html',
})
export class InsectPickerPage {

  insect;
  date;
  hour;
  feature;
  description;
  height;
  size;
  featureForm;
  heightForm;
  descriptionForm;
  county;
  currentInsect;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.date = navParams.get('date');
    this.hour = navParams.get('hour');
    this.county = navParams.get('county');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsectPickerPage');
  }

  openModal() {
    this.insect=(this.currentInsect==1?"Abeille":this.currentInsect==2?"Guêpe":this.currentInsect==3?"Frelon":"Unknown")
    var data = {date: this.date, hour: this.hour, county: this.county, insect: this.insect};
    var modalPage = this.modalCtrl.create('ReportPage', data);
    this.viewCtrl.dismiss();
    modalPage.present();
  }

  changeColor(nb, id, idBis, idTer) {
    this.currentInsect=nb;
    id.style = "border:2px solid limegreen";
    idBis.style = "border:2px solid white";
    idTer.style = "border:2px solid white";
  }

}
