import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {ReportPage} from "../report/report";
import {Insect} from "../../../../utils/enums";


@IonicPage()
@Component({
  selector: 'page-insect-picker',
  templateUrl: 'insect-picker.html',
})
export class InsectPickerPage {

  public myInsect = Insect;

  private readonly date;
  private readonly hour;
  private readonly county;
  private insect;
  private currentInsect;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.date = navParams.get('date');
    this.hour = navParams.get('hour');
    this.county = navParams.get('county');
  }

  public closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsectPickerPage');
  }

  openModal() {
    this.insect = (this.currentInsect == 1 ? "Abeille" : this.currentInsect == 2 ? "Guêpe" : this.currentInsect == 3 ? "Frelon" : "Unknown")
    var data = {date: this.date, hour: this.hour, county: this.county, insect: this.insect};
    var modalPage = this.modalCtrl.create('ReportPage', data);
    this.closeModal();
    modalPage.present();
  }

  changeColor(nb, id, idBis, idTer) {
    this.currentInsect = nb;
    id.style = "border:2px solid limegreen";
    idBis.style = "border:2px solid white";
    idTer.style = "border:2px solid white";
  }

}
