import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Insect} from "../../../utils/enums";
import {ReportPage} from "../report/report";


@IonicPage()
@Component({
  selector: 'page-insect-picker',
  templateUrl: 'insect-picker.html',
})
export class InsectPickerPage {

  public myInsect = Insect;

  private date: string;
  private hour: string;
  private readonly imgPath: string;
  private readonly telNumber: number;
  private insect: string;
  private currentInsect: number;
  public now: Date = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imgPath = navParams.get('imgPath');
    this.telNumber = navParams.get('telNumber');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsectPickerPage');
  }

  openModal() {
    this.date = this.now.getDate() + "-" + this.now.getMonth() + "-" + this.now.getFullYear();
    this.hour = this.now.getHours() + "h" + (this.now.getMinutes() > 9 ? this.now.getMinutes() : "0" + this.now.getMinutes());
    this.insect = (this.currentInsect == 1 ? this.myInsect.Bee :
      this.currentInsect == 2 ? this.myInsect.Wasp :
        this.currentInsect == 3 ? this.myInsect.Hornet : this.myInsect.Unknown)
    let data = {date: this.date, hour: this.hour, insect: this.insect, telNumber: this.telNumber, imgPath: this.imgPath};
    this.navCtrl.push(ReportPage, data)
  }

  changeColor(nb, id, idBis, idTer) {
    this.currentInsect = nb;
    id.style = "border:2px solid limegreen";
    idBis.style = "border:2px solid white";
    idTer.style = "border:2px solid white";
  }
}
