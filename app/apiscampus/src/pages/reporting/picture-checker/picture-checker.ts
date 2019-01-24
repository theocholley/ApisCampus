import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";
import {Server} from "../../../server/server";
import {InsectPickerPage} from "../insect-picker/insect-picker";
import * as Constants from '../../../utils/constants';


@IonicPage()
@Component({
  selector: 'page-picture-checker',
  templateUrl: 'picture-checker.html',
})
export class PictureCheckerPage {

  private base64Image: string = '';
  private imgPath: string;
  public now: Date = new Date();

  constructor(public navCtrl: NavController,
              private camera: Camera,
              public server: Server,
              private transfer: FileTransfer) {
    this.imgPath = "" + this.now.getDate() + this.now.getMonth() + this.now.getFullYear() + this.now.getHours() + this.now.getMinutes() + this.now.getSeconds() + ".jpg";
    this.openCamera()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PictureCheckerPage');
  }

  openInsectPicker() {
    this.navCtrl.push(InsectPickerPage, {imgPath: this.imgPath});
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  upload() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: this.imgPath,
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    };

    //file transfer action
    fileTransfer.upload(this.base64Image, Constants.PATHPHP + '/api/upload/upload.php', options)
      .then((data) => {
        console.log("Upload successful");
      }, (err) => {
        console.log(err);
      });
    this.openInsectPicker();
  }
}
