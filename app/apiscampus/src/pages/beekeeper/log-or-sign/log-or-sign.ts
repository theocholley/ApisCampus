import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignUpPage} from "../sign-up/sign-up";
import {LoginPage} from "../login/login";


@IonicPage()
@Component({
  selector: 'page-log-or-sign',
  templateUrl: 'log-or-sign.html',
})
export class LogOrSignPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogOrSignPage');
  }

  goToSignUp(){
    this.navCtrl.push(SignUpPage)
  }

  goToLogIn(){
    this.navCtrl.push(LoginPage)
  }

}
