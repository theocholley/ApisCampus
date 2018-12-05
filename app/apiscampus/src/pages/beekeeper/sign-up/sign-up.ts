import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Server} from "../../../server/server";
import {SignUpMapPage} from "../sign-up-map/sign-up-map";


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private mailForm: string;
  private nameForm: string;
  private surnameForm: string;
  private passcodeForm: string;
  private phoneForm: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public server: Server) {
  }

  ionViewDidEnter() {
  }


  signUp() {
    let data = {mail: this.mailForm, name: this.nameForm, surname: this.surnameForm, passcode: this.passcodeForm, phone: this.phoneForm};
    this.navCtrl.push(SignUpMapPage, data)
  }

}
