import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {SignUpPage} from "../sign-up/sign-up";
import {MapPage} from "../map/map";
import {Server} from "../../../server/server";
import {NativeStorage} from "@ionic-native/native-storage";


@IonicPage()
@Component({
  selector: 'page-log-or-sign',
  templateUrl: 'log-or-sign.html',
})
export class LogOrSignPage {

  private passwordForm;
  private mailForm: string;
  private results;

  constructor(private nativeStorage: NativeStorage,
              public navCtrl: NavController,
              private alertCtrl: AlertController,
              public server: Server,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogOrSignPage');
  }


  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Chargement des données...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 4000);
  }

  connect() {
    let req = this.server.login(this.mailForm, this.passwordForm);
    this.results = JSON.parse(req.responseText);
    if (this.results.passed == true) {
      this.goToMap()
    } else {
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
    if (JSON.parse(req.responseText).result.length > 0) {
      idMyReservedSwarm = JSON.parse(req.responseText).result[0].idSwarm;
    }
    let data = {idBeekeeper: this.results.result[0].id, idMyReservedSwarm: idMyReservedSwarm};
    this.navCtrl.push(MapPage, data);
  }

  goToSignUp() {
    this.navCtrl.push(SignUpPage)
  }

}
