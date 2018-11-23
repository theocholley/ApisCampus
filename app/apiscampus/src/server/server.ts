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

    ///addSwarm/:longitude/:latitude/:date/:hour/:feature/:height/:description/:county/:numberObs

    addSwarm(longitude, latitude, date, hour, feature, height, description, county, numberObs) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/addSwarm/".concat(longitude).concat("/").concat(latitude).concat("/").concat(date).concat("/").concat(hour).concat("/").concat(feature).concat("/").concat(height).concat("/").concat(description).concat("/").concat(county).concat("/").concat(numberObs)), false);
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

    //'/deleteSwarm/:id'
    deleteSwarm(id){
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/deleteSwarm").concat("/").concat(id), false);
        req.send(null);
        return req;
    }

    //Partie Apiculteur :

    //'/createBeekeeper/:name/:surname/:city/:ray/:passcode/:phone'
    addBeekeeper(id, name, surname, city, ray, passcode, phone){
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/createBeekeeper/".concat(name).concat("/").concat(surname).concat("/").concat(city).concat("/").concat(ray).concat("/").concat(passcode).concat("/").concat(phone)), false);
        req.send(null);
        return req;
    }

    ///login/:name/:passcode
    login(name, passcode){
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/login/".concat(name).concat("/").concat(passcode)), false);
        req.send(null);
        return req;
    }

    ///getMySwarms/:numberObs
    //Numberobs est le numéro de tel de l'observateur
    getMySwarms(numberObs){
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/getMySwarms/".concat(numberObs)), false);
        req.send(null);
        return req;
    }


}
