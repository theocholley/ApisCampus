import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Server} from "../../../server/server";
import leaflet from 'leaflet';
import L from "leaflet";
import {LogOrSignPage} from "../log-or-sign/log-or-sign";

var latitude;
var longitude;
var latitudeOfCenter;
var longitudeOfCenter;

@IonicPage()
@Component({
  selector: 'page-sign-up-map',
  templateUrl: 'sign-up-map.html',
})
export class SignUpMapPage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  private zoom: number = 10;
  private rayForm: number = 10;
  private readonly mail: string;
  private readonly name: string;
  private readonly surname: string;
  private readonly passcode: string;
  private readonly phone: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public server: Server) {
    this.mail = navParams.get('mail');
    this.name = navParams.get('name');
    this.surname = navParams.get('surname');
    this.passcode = navParams.get('passcode');
    this.phone = navParams.get('phone');
    latitude = navParams.get('latitude');
    longitude = navParams.get('longitude');
    latitudeOfCenter = navParams.get('latitude');
    longitudeOfCenter = navParams.get('longitude');
  }

  ionViewDidEnter() {
    if (this.map) {
      this.map.remove();
    }
    this.loadmap();
    this.printStuff(this.rayForm, this.map);
  }

  loadmap() {
    this.map = L.map('map').setView([latitudeOfCenter, longitudeOfCenter], this.zoom);
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
  }

  printStuff(ray, map) {
    let markers: L.marker[] = [];
    let circles: L.circle[] = [];
    markers.push(L.marker([latitude, longitude]).addTo(map));
    circles.push(L.circle([latitude, longitude], ray * 1000).addTo(map));
    this.map.on('click', function (e) {
      for (let i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
        map.removeLayer(circles[i]);
      }
      latitude = e.latlng.lat;
      longitude = e.latlng.lng;
      markers.push(L.marker([latitude, longitude]).addTo(map));
      circles.push(L.circle([latitude, longitude], ray * 1000).addTo(map));
    });
  }

  refreshRay() {
    this.zoom = this.map.getZoom();
    latitudeOfCenter = this.map.getCenter().lat;
    longitudeOfCenter = this.map.getCenter().lng;
    this.map.remove();
    this.loadmap();
    this.printStuff(this.rayForm, this.map);
  }

  signUp() {
    let req = this.server.addBeekeeper(this.name, this.surname, latitude, longitude, this.rayForm, this.passcode, this.phone, this.mail);
    let results = JSON.parse(req.responseText);
    if (results.passed == true) {
      let toast = this.toastCtrl.create({
        message: 'Votre compte a bien été enregistré, vous pouvez maintenant vous connecter',
        duration: 4000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
    } else {
      let alert = this.alertCtrl.create({
        title: 'Erreur',
        subTitle: 'Un compte a déjà été créé avec cette adresse mail',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.pop();
    }
  }
}
