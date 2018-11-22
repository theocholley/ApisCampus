/**
 * Created by thiba on 29/05/2018.
 */

export class Server {

    path: string;
    port: string;

    constructor() {
        this.path = "http://localhost:";
        this.port = "8080";
    }

    getAllPath() {
        return this.path.concat(this.port);
    }

    ///addSwarm/:longitude/:latitude/:date/:hour/:feature/:height/:description
    addSwarm(longitude, latitude, date, hour, feature, height, description, county) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/addSwarm/".concat(longitude).concat("/").concat(latitude).concat("/").concat(date).concat("/").concat(hour).concat("/").concat(feature).concat("/").concat(height).concat("/").concat(description).concat("/").concat(county)), false);
        req.send(null);
        return req;
    }

    getSwarms() {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/getSwarms"), false);
        req.send(null);
        return req;
    }

    //'/updateSwarm/:id/:value'
    updateLongitude(id, value) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/updateLongitude").concat("/").concat(id).concat("/").concat(value), false);
        req.send(null);
        return req;
    }

    updateLatitude(id, value) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/updateLatitude").concat("/").concat(id).concat("/").concat(value), false);
        req.send(null);
        return req;
    }

    updateDate(id, value) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/updateDate").concat("/").concat(id).concat("/").concat(value), false);
        req.send(null);
        return req;
    }

    updateHour(id, value) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/updateHour").concat("/").concat(id).concat("/").concat(value), false);
        req.send(null);
        return req;
    }

    updateFeature(id, value) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/updateFeature").concat("/").concat(id).concat("/").concat(value), false);
        req.send(null);
        return req;
    }

    updateHeight(id, value) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/updateHeight").concat("/").concat(id).concat("/").concat(value), false);
        req.send(null);
        return req;
    }

    updateDescription(id, value) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/updateDescription").concat("/").concat(id).concat("/").concat(value), false);
        req.send(null);
        return req;
    }

    updateCounty(id, value) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/updateCounty").concat("/").concat(id).concat("/").concat(value), false);
        req.send(null);
        return req;
    }

    //treat/:id
    treat(id) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/treat").concat("/").concat(id), false);
        req.send(null);
        return req;
    }
}
