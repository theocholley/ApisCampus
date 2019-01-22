import {Component} from '@angular/core';
import {AlertController, NavController, Platform} from 'ionic-angular';
import {CameraOrNotPage} from "../reporting/camera-or-not/camera-or-not";
import {LogOrSignPage} from "../beekeeper/log-or-sign/log-or-sign";
import {NativeStorage} from "@ionic-native/native-storage";
import {Server} from "../../server/server";
import {Geolocation} from "@ionic-native/geolocation";
import {Network} from "@ionic-native/network";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private nativeStorage: NativeStorage,
              public navCtrl: NavController,
              public platform: Platform,
              public network: Network,
              public alertCtrl: AlertController,
              private geolocation: Geolocation,
              public server: Server) {
    this.platform.ready().then(() => {
      if (this.network.type != "none") {
        this.nativeStorage.getItem('request')
          .then(
            data => {
              this.server.addSwarm(data.long, data.lat, data.date, data.hour, data.feature, data.height, data.description, data.telNumber, data.size, data.insect, data.img, data.idDevice);
              this.nativeStorage.remove('request');
              this.alertRequestSent();
            },
            error => {
              console.log("No local requests to send")
            }
          );
      }
    });
    this.geolocation.getCurrentPosition().then((resp) => {
    }).catch((error) => {
      console.log('Error getting location', error);
      this.navCtrl.setRoot(HomePage);
    });
  }

  goToReport() {
    this.navCtrl.push(CameraOrNotPage);
  }

  goToConnect() {
    this.navCtrl.push(LogOrSignPage);
  }

  alertRequestSent() {
    let alert = this.alertCtrl.create({
      title: 'Merci!',
      subTitle: 'Votre signalement hors connexion a bien été transmis à notre base de données',
      buttons: ['OK']
    });
    alert.present();
  }

}
