import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MapPage} from "../map/map";
import {Server} from "../../../server/server";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private passwordForm;
  private nameForm;
  private results;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, public server: Server) {
  }

  connect() {
    let req = this.server.login(this.nameForm, this.passwordForm);
    this.results = JSON.parse(req.responseText).result;
    if (this.results.length==1){
      this.goToMap()
    }
      else{
        let alert = this.alertCtrl.create({
          title: 'Erreur',
          subTitle: 'La combinaison adresse mail / mot de passe est incorrecte',
          buttons: ['OK']
        });
        alert.present();
    }
  }

  goToMap() {
    let data = {idBeekeeper: this.results[0].id};
    this.navCtrl.push(MapPage, data);
  }

}
