import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Server} from "../../../../server/server";
import {HomePage} from "../../../home/home";
import {CameraOrNotPage} from "../../reportSwarm/camera-or-not/camera-or-not";


@IonicPage()
@Component({
  selector: 'page-my-reports',
  templateUrl: 'my-reports.html',
})
export class MyReportsPage {

  choice = 'list';

  private results;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public server: Server) {
    var req = this.server.getSwarms();
    this.results = JSON.parse(req.responseText).result;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyReportsPage');
  }

  edit(item) {
    var modalPage = this.modalCtrl.create('ReportPage', item);
    modalPage.present();
  }

  delete(item) {

  }

  goToMenu() {
    this.navCtrl.setRoot(HomePage);
  }

  goToPhoto() {
    this.navCtrl.setRoot(CameraOrNotPage);
  }

  // addS() {
  //     var req = this.server.addSwarm("long","lat","date","h","f","h","d");
  //     var req2 = this.server.treat(0);
  //    /* var req2 = this.server.updateLatitude(0, "updatedLatitude");
  //     var req3= this.server.updateDate(0,"datee");
  //     var req4 = this.server.updateHour(0,"h");
  //     var req5= this.server.updateFeature(0,"f");
  //     var req6 = this.server.updateDescription(0,"d");
  //     /*
  //           var req = this.server.getSwarms();
  //           var resultat = JSON.parse(req.responseText);
  //           console.log(resultat.result);
  //           */
  //         }

}
