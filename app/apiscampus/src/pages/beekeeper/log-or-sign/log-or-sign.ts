import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {SignUpPage} from "../sign-up/sign-up";
import {MapPage} from "../map/map";
import {Server} from "../../../server/server";


@IonicPage()
@Component({
  selector: 'page-log-or-sign',
  templateUrl: 'log-or-sign.html',
})
export class LogOrSignPage {

  private loader;
  private passwordForm;
  private nameForm;
  private results;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              public navParams: NavParams,
              public server: Server,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogOrSignPage');
  }

  load(){
    this.loader = this.loadingCtrl.create({
      content: "Chargement..."
    });
    this.loader.present();
  }

  connect() {
    this.load();
    let req = this.server.login(this.nameForm, this.passwordForm);
    console.log(req)
    this.results = JSON.parse(req.responseText);
    if (this.results.passed == true) {
      this.goToMap()
    } else {
      this.loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Erreur',
        subTitle: 'La combinaison adresse mail / mot de passe est incorrecte',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  goToMap() {
    let idMyReservedSwarm = -1;
    let req = this.server.getReservation(this.results.result[0].id);
    if (JSON.parse(req.responseText).result.length>0){
      idMyReservedSwarm = JSON.parse(req.responseText).result[0].idSwarm;
    }
    let data = {idBeekeeper: this.results.result[0].id, idMyReservedSwarm: idMyReservedSwarm};
    this.loader.dismiss();
    this.navCtrl.push(MapPage, data);
  }

  goToSignUp() {
    this.navCtrl.push(SignUpPage)
  }

}
