import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CameraOrNotPage} from "../reporting/camera-or-not/camera-or-not";
import {LogOrSignPage} from "../beekeeper/log-or-sign/log-or-sign";
import {NativeStorage} from "@ionic-native/native-storage";
import {Server} from "../../server/server";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public server: Server) {
    this.nativeStorage.getItem('request')
      .then(
        data => {
          this.server.addSwarm(data.long, data.lat, data.date, data.hour, data.feature, data.height, data.description, data.telNumber, data.size, data.insect, data.img);
          this.nativeStorage.remove('request')
        },
        error => {
          console.log("No local requests to send")
        }
      );
  }

  goToReport() {
    this.navCtrl.push(CameraOrNotPage);
  }

  goToConnect() {
    this.navCtrl.push(LogOrSignPage);
  }

}
