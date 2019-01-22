import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {InsectPickerPage} from "../insect-picker/insect-picker";
import {Server} from "../../../server/server";
import {PictureCheckerPage} from "../picture-checker/picture-checker";


@IonicPage()
@Component({
  selector: 'camera-or-not',
  templateUrl: 'camera-or-not.html',
})
export class CameraOrNotPage {

  public now: Date = new Date();

  constructor(public navCtrl: NavController,
              public server: Server) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPhotoPage');
  }

  openInsectPicker() {
    this.navCtrl.push(InsectPickerPage, {imgPath: "noimg"})
  }

  openPictureChecker() {
    this.navCtrl.push(PictureCheckerPage)
  }
}
