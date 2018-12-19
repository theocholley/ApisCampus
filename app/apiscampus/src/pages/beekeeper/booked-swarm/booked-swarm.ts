import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-booked-swarm',
  templateUrl: 'booked-swarm.html',
})
export class BookedSwarmPage {

  private idSwarm;
  private idMyReservedSwarm;
  private myReservedSwarm;
  private hour: string;
  private date: string;
  private county: string;
  private feature: string;
  private height: string;
  private description: string;
  private size: string;
  private telNumber: number;
  private insectType: string;
  private pic: string;
  private idBeekeeper;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.idBeekeeper = navParams.get('idBeekeeper');
    this.idMyReservedSwarm = navParams.get('idMyReservedSwarm');
    this.myReservedSwarm = navParams.get('myReservedSwarm');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookedSwarmPage');
  }

  endBooking(){

  }

  cancelBooking(){

  }
}
