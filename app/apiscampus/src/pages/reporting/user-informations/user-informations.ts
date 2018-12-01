import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";


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
