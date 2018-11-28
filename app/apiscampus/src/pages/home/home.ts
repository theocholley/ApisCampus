import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CameraOrNotPage} from "../reporting/reportSwarm/camera-or-not/camera-or-not";
import {LogOrSignPage} from "../beekeeper/log-or-sign/log-or-sign";


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
    this.navCtrl.push(LogOrSignPage);
  }

}
