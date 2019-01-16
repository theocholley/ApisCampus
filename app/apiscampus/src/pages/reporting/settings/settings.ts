import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  telNumber: number;

  constructor(public navCtrl: NavController,
              private nativeStorage: NativeStorage,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
    this.nativeStorage.getItem('telNumber')
      .then(
        data => {
          this.telNumber = data.number
        },
        error => {
        }
      );
  }

  public closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  modifyNumber(): void {
    this.nativeStorage.setItem('telNumber',
      {number: this.telNumber})
      .then(
        () => console.log('Stored number!'),
        error => console.error('Error storing item', error)
      );
    this.presentToast();
    this.closeModal();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Votre numéro a bien été mis à jour.',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
