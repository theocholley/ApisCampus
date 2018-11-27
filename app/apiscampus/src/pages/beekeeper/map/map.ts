import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import leaflet from 'leaflet';
import L from "leaflet";
import {InformationsPage} from "../informations/informations";
import {Server} from "../../../server/server";


var bee = L.icon({
  iconUrl: 'https://cdn2.iconfinder.com/data/icons/outline-signs/350/bee-512.png',
  iconSize: [40, 40], // size of the icon
});

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  private results;

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public server: Server) {
    var req = this.server.getSwarms();
    this.results = JSON.parse(req.responseText).result;
  }

  ionViewDidEnter() {
    if (this.map) {
      this.map.remove();
    }
    this.loadmap();
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationerror', (err) => {
      alert(err.message);
    });

    for (let i in this.results) {
      var tmpResults = this.results
      var tmpPos = [this.results[i].latitude, this.results[i].longitude]
      var tmpNav = this.navCtrl;
      var marker = L.marker(tmpPos, {icon: bee}).addTo(this.map)//.bindPopup("<button>button</button>");
      marker.on('click', function () {
        tmpNav.push(InformationsPage, {
          item: tmpResults[i]
        });
      });
    }
  }

}
