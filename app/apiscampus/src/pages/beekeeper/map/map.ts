import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import leaflet from 'leaflet';
import L from "leaflet";
import {InformationsPage} from "../informations/informations";
import {Server} from "../../../server/server";


var bee = L.icon({
  iconUrl: 'assets/imgs/bee.png',
  iconSize: [40, 40],
});

var beeR = L.icon({
  iconUrl: 'assets/imgs/beeR.png',
  iconSize: [40, 40],
});

var beeM = L.icon({
  iconUrl: 'assets/imgs/beeM.png',
  iconSize: [40, 40],
});

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  private results;
  private idBeekeeper;
  private idMyReservedSwarm;
  private myReservedSwarm;

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public server: Server,
              public toastCtrl: ToastController) {
    this.idBeekeeper = navParams.get('idBeekeeper');
    this.idMyReservedSwarm = navParams.get('idMyReservedSwarm');
    let req = this.server.getSwarms();
    this.results = JSON.parse(req.responseText).result;
  }

  ionViewDidEnter() {

  }

  ionViewWillEnter() {
    if (this.map) {
      this.map.remove();
    }
    this.loadmap();
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 30
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 12
    }).on('locationerror', (err) => {
      alert(err.message);
    });

    for (let i in this.results) {
      let marker;
      let tmpResults = this.results;
      let tmpToast = this.toastCtrl;
      let tmpIdBeekeeper = this.idBeekeeper;
      let tmpIdMyReservedSwarm = this.idMyReservedSwarm;
      let tmpPos = [this.results[i].latitude, this.results[i].longitude];
      let tmpNavCtrl = this.navCtrl;
      // var trigger1 = this.results[i].latitude,
      //   regexp = new RegExp('[-+]?[0-9]*\\.?[0-9]*'),
      //   test1 = regexp.test(trigger1);
      // var trigger2 = this.results[i].longitude,
      //   regexp = new RegExp('[-+]?[0-9]*\\.?[0-9]*'),
      //   test2 = regexp.test(trigger2);
      // if (test1&&test2) {
      if (this.results[i].id == this.idMyReservedSwarm) {
        this.myReservedSwarm = this.results[i];
        let tmpIdMyReservedSwarm = this.idMyReservedSwarm;
        marker = L.marker(tmpPos, {icon: beeM}).addTo(this.map);
        marker.on('click', function () {
          let data = {item: tmpResults[i], idBeekeeper: tmpIdBeekeeper, idMyReservedSwarm: tmpIdMyReservedSwarm};
          tmpNavCtrl.push(InformationsPage, data);
        });
      }
      if (this.results[i].isAvailable == true && this.results[i].isTreated == true && this.results[i].id != this.idMyReservedSwarm) {
        marker = L.marker(tmpPos, {icon: beeR}).addTo(this.map);
        marker.on('click', function () {
          let toast = tmpToast.create({
            message: 'Cet essaim est déjà réservé',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        });
      } else if (this.results[i].isAvailable == true && this.results[i].isTreated == false) {
        marker = L.marker(tmpPos, {icon: bee}).addTo(this.map);
        marker.on('click', function () {
          let data = {item: tmpResults[i], idBeekeeper: tmpIdBeekeeper, idMyReservedSwarm: tmpIdMyReservedSwarm};
          tmpNavCtrl.push(InformationsPage, data);
        });
      }
    }
  }

  goToBookedSwarm() {
    if (this.idMyReservedSwarm == -1) {
      let toast = this.toastCtrl.create({
        message: 'Vous n\'avez pas réservé d\'essaim pour le moment',
        duration: 4000,
        position: 'bottom'
      });
      toast.present();
    } else {
      let data = {item: this.myReservedSwarm, idBeekeeper: this.idBeekeeper, idMyReservedSwarm: this.idMyReservedSwarm};
      this.navCtrl.push(InformationsPage, data);
    }
  }
}
