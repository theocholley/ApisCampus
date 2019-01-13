import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Server} from "../../../server/server";
import {SignUpMapPage} from "../sign-up-map/sign-up-map";
import {Geolocation} from "@ionic-native/geolocation";

var latitude;
var longitude;

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private mailForm: string;
  private nameForm: string;
  private surnameForm: string;
  private passcodeForm: string;
  private phoneForm: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              public alertCtrl: AlertController,
              public server: Server) {
  }

  ionViewDidEnter() {
  }


  signUp() {
    var trigger = this.mailForm,
      regexp = new RegExp('[^@]+@[^\\.]+\\..+'),
      test = regexp.test(trigger);
    if(test) {
      this.geolocation.getCurrentPosition().then((resp) => {
        latitude = resp.coords.latitude;
        longitude = resp.coords.longitude;
        let data = {
          mail: this.mailForm,
          name: this.nameForm,
          surname: this.surnameForm,
          passcode: this.passcodeForm,
          phone: this.phoneForm,
          latitude: latitude,
          longitude: longitude
        };
        this.navCtrl.push(SignUpMapPage, data)
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
    else {
      this.presentMailAlert()
    }
  }

  presentMailAlert() {
    let alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: 'Votre adresse mail est incorrecte, veuillez la vérifier',
      buttons: ['OK']
    });
    alert.present();
  }

}
