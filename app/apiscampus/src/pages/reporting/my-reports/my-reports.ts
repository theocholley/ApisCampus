import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ReportEditPage} from "../report-edit/report-edit";
import {Server} from "../../../server/server";

/**
 * Generated class for the MyReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-my-reports',
    templateUrl: 'my-reports.html',
})
export class MyReportsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public server: Server) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyReportsPage');
    }

    edit(item) {
        this.navCtrl.push(ReportEditPage, {
            item: item
        });
    }

    addS() {
        var req = this.server.addSwarm("long","lat","date","h","f","h","d");
        var req2 = this.server.treat(0);
       /* var req2 = this.server.updateLatitude(0, "updatedLatitude");
        var req3= this.server.updateDate(0,"datee");
        var req4 = this.server.updateHour(0,"h");
        var req5= this.server.updateFeature(0,"f");
        var req6 = this.server.updateDescription(0,"d");
        /*
              var req = this.server.getSwarms();
              var resultat = JSON.parse(req.responseText);
              console.log(resultat.result);
              */
            }

}
