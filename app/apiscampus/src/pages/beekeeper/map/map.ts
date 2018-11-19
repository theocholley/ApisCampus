import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import leaflet from 'leaflet';
import L from "leaflet";
import {InformationsPage} from "../informations/informations";


/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

var bee = L.icon({
  iconUrl: 'https://cdn2.iconfinder.com/data/icons/outline-signs/350/bee-512.png',
  iconSize: [40, 40], // size of the icon
});

var myPos: L.marker[] = [[43.55, 7.05], [43.6, 7.1], [43.8, 7.2]];


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    if(this.map) {
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
    })


    for (let i in myPos) {
      var tmpNav = this.navCtrl;
      var marker = L.marker(myPos[i], {icon: bee}).addTo(this.map).bindPopup("<button>button</button>");
      marker.on('click', function(){
        tmpNav.push(InformationsPage);
      });
    }
  }

  goToInfos() {

  }

}
