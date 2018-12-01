import {HomePage} from "../../home/home";
import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {InsectPickerPage} from "../insect-picker/insect-picker";
import {Server} from "../../../server/server";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {UserInformationsPage} from "../user-informations/user-informations";
import {NativeStorage} from "@ionic-native/native-storage";
import {SettingsPage} from "../settings/settings";
import {HttpClient} from "@angular/common/http";
import {File} from "@ionic-native/file";
import {FileTransfer, FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";


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

  constructor(private nativeStorage: NativeStorage,
              public navCtrl: NavController,
              private camera: Camera,
              public server: Server,
              public navParams: NavParams,
              private file: File,
              private transfer: FileTransfer,
              public modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private http: HttpClient) {
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

  openModalReport() {
    this.date = this.now.getDate() + "-" + this.now.getMonth() + "-" + this.now.getFullYear();
    this.hour = this.now.getHours() + "h" + (this.now.getMinutes() > 10 ? this.now.getMinutes() : "0" + this.now.getMinutes());
    let data = {date: this.date, hour: this.hour, img: this.base64Image, telNumber: this.telNumber};
    let modalPage = this.modalCtrl.create('InsectPickerPage', data);
    modalPage.present();
  }

  openCamera(){
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  goToMenu() {
    this.navCtrl.setRoot(HomePage)
  }

  goToSettings() {
    let modalPage = this.modalCtrl.create('SettingsPage');
    modalPage.present();
  }

  upload(){
    //Show loading
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    var random = Math.floor(Math.random() * 100);

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "myImage_" + random + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    };

    //file transfer action
    fileTransfer.upload(this.base64Image, 'http://192.168.1.21/api/upload/upload.php', options)
      .then((data) => {
        alert("Success");
        loader.dismiss();
      }, (err) => {
        console.log(err);
        alert("Error");
        loader.dismiss();
      });
  }
}
