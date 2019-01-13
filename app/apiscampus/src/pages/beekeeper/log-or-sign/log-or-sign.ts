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

  connect() {
    let req = this.server.login(this.nameForm, this.passwordForm);
    this.results = JSON.parse(req.responseText);
    console.log(this.results)
    if (this.results.passed == true) {
      this.goToMap()
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Erreur',
        subTitle: 'La combinaison adresse mail / mot de passe est incorrecte',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  goToMap() {
    //Show loading
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();

    let idMyReservedSwarm=-2;
    let req = this.server.getReservation(this.results.result[0].id);
    try {
      idMyReservedSwarm=JSON.parse(req.responseText).result[0].idSwarm;
    }
    catch(e) {
      idMyReservedSwarm=-1;
    }
    let data = {idBeekeeper: this.results[0].id, idMyReservedSwarm: idMyReservedSwarm};
    this.navCtrl.push(MapPage, data);
  }

  goToSignUp() {
    this.navCtrl.push(SignUpPage)
  }

}
