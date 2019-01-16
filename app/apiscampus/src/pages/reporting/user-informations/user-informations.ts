import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import {HomePage} from "../../home/home";


@IonicPage()
@Component({
  selector: 'page-user-informations',
  templateUrl: 'user-informations.html',
})
export class UserInformationsPage {

  private telNumber: number;

  constructor(private nativeStorage: NativeStorage,
              public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController) {
  }

  public closeModal() {
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInformationsPage');
  }

  storeNumber(): void {
    this.nativeStorage.setItem('telNumber',
      {number: this.telNumber})
      .then(
        () => console.log('Stored number!'),
        error => console.error('Error storing item', error)
      );
    this.viewCtrl.dismiss();
  }


}
