import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public server: Server) {
  }

  connect() {
    var req = this.server.login(this.nameForm, this.passwordForm);
    //console.log(req)
    this.goToMap()
  }

  goToMap() {
    this.navCtrl.push(MapPage);
  }

}
