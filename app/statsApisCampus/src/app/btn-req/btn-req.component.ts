import {Component, OnInit} from '@angular/core';
import {Server} from "../../../server/server";

@Component({
    selector: 'app-btn-req',
    templateUrl: './btn-req.component.html',
    styleUrls: ['./btn-req.component.css']
})
export class BtnReqComponent implements OnInit {
    server = new Server();

    constructor() {
    }

    ngOnInit() {
    }

    req() {
        var req = this.server.getSwarms();
        let res = JSON.parse(req.response);
        console.log(res.result);
    }
}
