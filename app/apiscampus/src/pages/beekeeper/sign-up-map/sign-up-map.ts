import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Server} from "../../../server/server";
import {LoginPage} from "../login/login";
import leaflet from 'leaflet';
import L from "leaflet";
import {Geolocation} from "@ionic-native/geolocation";

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

  private zoom: number=10;
  private rayForm: number = 10;
  private readonly mail: string;
  private readonly name: string;
  private readonly surname: string;
  private readonly passcode: string;
  private readonly phone: number;

  constructor(public navCtrl: NavController,
              private geolocation: Geolocation,
              public navParams: NavParams,
              public server: Server) {
    this.geolocation.getCurrentPosition().then((resp) => {
      latitude=resp.coords.latitude;
      longitude=resp.coords.longitude;
      latitudeOfCenter=latitude;
      longitudeOfCenter=longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    this.mail = navParams.get('mail');
    this.name = navParams.get('name');
    this.surname = navParams.get('surname');
    this.passcode = navParams.get('passcode');
    this.phone = navParams.get('phone');
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

  printStuff(ray, map){
    let markers: L.marker[]=[];
    let circles: L.circle[]=[];
    markers.push(L.marker([latitude, longitude]).addTo(map));
    circles.push(L.circle([latitude, longitude], ray*1000).addTo(map));
    this.map.on('click', function(e) {
      for(let i = 0; i < markers.length; i++){
        map.removeLayer(markers[i]);
        map.removeLayer(circles[i]);
      }
      latitude = e.latlng.lat;
      longitude = e.latlng.lng;
      markers.push(L.marker([latitude, longitude]).addTo(map));
      circles.push(L.circle([latitude, longitude], ray*1000).addTo(map));
    });
  }

  refreshRay(){
    this.zoom = this.map.getZoom();
    latitudeOfCenter = this.map.getCenter().lat;
    longitudeOfCenter = this.map.getCenter().lng;
    this.map.remove();
    this.loadmap();
    this.printStuff(this.rayForm, this.map);
  }

  signUp() {
    this.server.addBeekeeper(this.name, this.surname, latitude, longitude, this.rayForm, this.passcode, this.phone, this.mail);
    this.navCtrl.setRoot(LoginPage)
  }

}
