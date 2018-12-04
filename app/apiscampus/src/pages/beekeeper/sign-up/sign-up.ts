import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Server} from "../../../server/server";
import {LoginPage} from "../login/login";


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private idForm=0;
  private nameForm: string;
  private surnameForm: string;
  private cityForm: string;
  private rayForm: string;
  private passcodeForm: string;
  private phoneForm: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public server: Server) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp() {
    //this.server.addBeekeeper(this.idForm, this.nameForm, this.surnameForm, this.cityForm, this.rayForm, this.passcodeForm, this.phoneForm);
    this.navCtrl.push(LoginPage)
  }

}
