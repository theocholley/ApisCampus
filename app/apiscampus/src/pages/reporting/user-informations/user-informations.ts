import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the UserInformationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-informations',
  templateUrl: 'user-informations.html',
})
export class UserInformationsPage {

  private telNumber: number;

  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  public closeModal() {
    this.viewCtrl.dismiss();
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
    this.closeModal();
  }


}
