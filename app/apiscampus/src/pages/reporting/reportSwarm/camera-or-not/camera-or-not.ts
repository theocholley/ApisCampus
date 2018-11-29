declare var require: any;
import {HomePage} from "../../../home/home";
import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {InsectPickerPage} from "../insect-picker/insect-picker";
import {Server} from "../../../../server/server";
import {Geolocation} from '@ionic-native/geolocation';
import {MyReportsPage} from "../../reportList/my-reports/my-reports";
import {Camera, CameraOptions} from "@ionic-native/camera";


@IonicPage()
@Component({
  selector: 'camera-or-not',
  templateUrl: 'camera-or-not.html',
})
export class CameraOrNotPage {

  choice = 'photo';

  private base64Image: string = "assets/imgs/logoapiscampus.png";
  private date;
  private hour;
  private county;
  public now: Date = new Date();


  constructor(public navCtrl: NavController, private camera: Camera, public server: Server, public navParams: NavParams, public modalCtrl: ModalController, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPhotoPage');
  }

  openModalReport() {
    this.date = this.now.getDate() + "-" + this.now.getMonth() + "-" + this.now.getFullYear();
    this.hour = this.now.getHours() + "h" + (this.now.getMinutes() > 10 ? this.now.getMinutes() : "0" + this.now.getMinutes());
    this.geolocation.getCurrentPosition().then((resp) => {
      this.county = this.getCounty(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getCounty(lat, long) {
    var county = "undefined";
    var req = new XMLHttpRequest();
    req.open("GET", "https://nominatim.openstreetmap.org/reverse?format=xml&lat=" + lat + "&lon=" + long + "&zoom=18&addressdetails=1", false);
    req.send(null);
    let parseString = require('xml2js').parseString;
    let xml = req.responseText;
    parseString(xml, function (err, result) {
      var jsonResult = JSON.parse(JSON.stringify(result));
      county = jsonResult.reversegeocode.addressparts[0].town;
      county += ", " + jsonResult.reversegeocode.addressparts[0].county;
    });
    var data = {date: this.date, hour: this.hour, county: county.toString(), img: this.base64Image};
    console.log(this.base64Image)
    var modalPage = this.modalCtrl.create('InsectPickerPage', data);
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

  goToReportList() {
    this.navCtrl.setRoot(MyReportsPage);
  }
}
