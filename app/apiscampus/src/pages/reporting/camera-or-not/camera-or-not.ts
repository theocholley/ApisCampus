import {HomePage} from "../../home/home";
import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {InsectPickerPage} from "../insect-picker/insect-picker";
import {Server} from "../../../server/server";
import {UserInformationsPage} from "../user-informations/user-informations";
import {NativeStorage} from "@ionic-native/native-storage";
import {SettingsPage} from "../settings/settings";
import {PictureCheckerPage} from "../picture-checker/picture-checker";


@IonicPage()
@Component({
  selector: 'camera-or-not',
  templateUrl: 'camera-or-not.html',
})
export class CameraOrNotPage {

  private telNumber: number;
  public now: Date = new Date();

  constructor(private nativeStorage: NativeStorage,
              public navCtrl: NavController,
              public server: Server,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
    this.nativeStorage.getItem('telNumber')
      .then(
        data => {
          this.telNumber=data.number
        },
        error => {
          let modalPage = this.modalCtrl.create('UserInformationsPage');
          modalPage.present();
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPhotoPage');
  }

  openInsectPicker() {
    let data = {telNumber: this.telNumber, imgPath: "noimg"};
    let modalPage = this.modalCtrl.create('InsectPickerPage', data);
    modalPage.present();
  }

  openPictureChecker() {
    let data = {telNumber: this.telNumber};
    let modalPage = this.modalCtrl.create('PictureCheckerPage', data);
    modalPage.present();
  }

  goToMenu() {
    this.navCtrl.setRoot(HomePage)
  }

  goToSettings() {
    let modalPage = this.modalCtrl.create('SettingsPage');
    modalPage.present();
  }
}
