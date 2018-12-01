import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Insect} from "../../../utils/enums";
import {ReportPage} from "../report/report";


@IonicPage()
@Component({
  selector: 'page-insect-picker',
  templateUrl: 'insect-picker.html',
})
export class InsectPickerPage {

  public myInsect = Insect;

  private readonly date: string;
  private readonly hour: string;
  private readonly img;
  private readonly telNumber: number;
  private insect: string;
  private currentInsect: number;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.date = navParams.get('date');
    this.hour = navParams.get('hour');
    this.img = navParams.get('img');
    this.telNumber = this.navParams.get('telNumber');
  }

  public closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsectPickerPage');
  }

  openModal() {
    this.insect = (this.currentInsect == 1 ? this.myInsect.Bee :
      this.currentInsect == 2 ? this.myInsect.Wasp :
        this.currentInsect == 3 ? this.myInsect.Hornet : this.myInsect.Unknown)
    let data = {date: this.date, hour: this.hour, insect: this.insect, img: this.img, telNumber: this.telNumber};
    let modalPage = this.modalCtrl.create('ReportPage', data);
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
