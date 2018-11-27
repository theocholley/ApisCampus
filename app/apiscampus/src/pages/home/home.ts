import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from "../beekeeper/login/login";
import {CameraOrNotPage} from "../reporting/reportSwarm/camera-or-not/camera-or-not";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToReport() {
    this.navCtrl.push(CameraOrNotPage);
  }

  goToConnect() {
    this.navCtrl.push(LoginPage);
  }

}
