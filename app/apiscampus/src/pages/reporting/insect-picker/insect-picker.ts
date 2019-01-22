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
  private insect: string;
  private currentInsect: number = -1;
  public now: Date = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imgPath = navParams.get('imgPath');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsectPickerPage');
  }

  openModal() {
    this.date = this.now.getDate() + "-" + (Number(this.now.getMonth() + 1) > 9 ? Number(this.now.getMonth() + 1) : "0" + Number(this.now.getMonth() + 1)) + "-" + this.now.getFullYear();
    this.hour = this.now.getHours() + "h" + (this.now.getMinutes() > 9 ? this.now.getMinutes() : "0" + this.now.getMinutes());
    this.insect = (this.currentInsect == 1 ? this.myInsect.Bee :
      this.currentInsect == 2 ? this.myInsect.Wasp :
        this.currentInsect == 3 ? this.myInsect.Hornet : this.myInsect.Unknown)
    let data = {
      date: this.date,
      hour: this.hour,
      insect: this.insect,
      imgPath: this.imgPath
    };
    this.navCtrl.push(ReportPage, data)
  }

  changeColor(nb, id, idBis, idTer) {
    if (this.currentInsect == nb)
      id.style = ""
    else {
      this.currentInsect = nb;
      id.style = "border:2px solid #FFC300; border-radius: 2px; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);";
    }
    idBis.style = "";
    idTer.style = "";
  }
}
