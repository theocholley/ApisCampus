import {HomePage} from "../../home/home";
import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {InsectPickerPage} from "../insect-picker/insect-picker";
import {Server} from "../../../server/server";
import {Geolocation} from '@ionic-native/geolocation';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {UserInformationsPage} from "../user-informations/user-informations";
import {NativeStorage} from "@ionic-native/native-storage";


@IonicPage()
@Component({
  selector: 'camera-or-not',
  templateUrl: 'camera-or-not.html',
})
export class CameraOrNotPage {

  private base64Image: string //= "assets/imgs/logoapiscampus.png";
  private date: string;
  private hour: string;
  private telNumber: number;
  public now: Date = new Date();

  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, private camera: Camera, public server: Server, public navParams: NavParams, public modalCtrl: ModalController, private geolocation: Geolocation) {
    this.nativeStorage.getItem('telNumber')
      .then(
        data => {
          this.telNumber=data.number
        },
        error => {
          var modalPage = this.modalCtrl.create('UserInformationsPage');
          modalPage.present();
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPhotoPage');
  }

  openModalReport() {
    this.date = this.now.getDate() + "-" + this.now.getMonth() + "-" + this.now.getFullYear();
    this.hour = this.now.getHours() + "h" + (this.now.getMinutes() > 10 ? this.now.getMinutes() : "0" + this.now.getMinutes());
    let data = {date: this.date, hour: this.hour, img: this.base64Image, telNumber: this.telNumber};
    let modalPage = this.modalCtrl.create('InsectPickerPage', data);
    modalPage.present();
  }

  openCamera(){
    const options: CameraOptions = {
      quality: 1,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.base64Image);
      this.openModalReport();
    }, (err) => {
      // Handle error
    });
  }

  goToMenu() {
    this.navCtrl.setRoot(HomePage)
  }
}
