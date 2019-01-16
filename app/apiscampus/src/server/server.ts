import * as Constants from '../utils/constants';

declare var require: any;

export class Server {

    path: string;
    port: string;
    token: string;

    constructor() {
      this.path = Constants.PATH;
      this.port = ':'+Constants.PORT;
      this.token = "";
    }

    getAllPath() {
        return this.path.concat(this.port);
    }

    addSwarm(longitude, latitude, date, hour, feature, height, description, numberObs, size, insectType, pic, idDevice) {
      let county = this.getCounty(latitude, longitude);
      let req = new XMLHttpRequest();
      req.open("GET", this.getAllPath().concat("/addSwarm/".concat(latitude).concat("/").concat(longitude).concat("/").concat(date).concat("/").concat(hour).concat("/").concat(feature).concat("/").concat(height).concat("/").concat(description).concat("/").concat(county).concat("/").concat(numberObs).concat("/").concat(size).concat("/").concat(insectType).concat("/").concat(pic).concat("/").concat(idDevice)), false);
      req.send(null);
      return req;
    }

    getCounty(lat, long): string {
      let county = "undefined";
      let req = new XMLHttpRequest();
      req.open("GET", "https://nominatim.openstreetmap.org/reverse?format=xml&lat=" + lat + "&lon=" + long + "&zoom=18&addressdetails=1", false);
      req.send(null);
      require('xml2js').parseString(req.responseText, function (err, result) {
        let jsonResult = JSON.parse(JSON.stringify(result));
        county = jsonResult.reversegeocode.addressparts[0].postcode;
        county += ", " + jsonResult.reversegeocode.addressparts[0].county;
      });
      return county
    }


    getSwarms() {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/api/getSwarms"), false);
        req.setRequestHeader("token",this.token);
        req.send(null);
        return req;
    }

    //getAvailableSwarms
    getAvailableSwarms() {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/api/getAvailableSwarms"), false);
        req.setRequestHeader("token",this.token);
        req.send(null);
        return req;
    }

    //treat/:idApi/:idSwarm
    treat(idApi, idSwarm) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/api/treat").concat("/").concat(idApi).concat("/").concat(idSwarm), false);
        req.setRequestHeader("token",this.token);
        req.send(null);
        return req;
    }

    ///retrieve/:idSwarm
    retrieve(idSwarm) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/api/retrieve").concat("/").concat(idSwarm), false);
        req.setRequestHeader("token",this.token);
        req.send(null);
        return req;
    }


    //Partie Apiculteur :

    ///createBeekeeper/:name/:surname/:latCentre/:longCentre/:ray/:passcode/:phone
    addBeekeeper(name, surname, latCentre, longCentre, ray, passcode, phone, mail){
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/createBeekeeper/".concat(name).concat("/").concat(surname).concat("/").concat(latCentre).concat("/").concat(longCentre).concat("/").concat(ray).concat("/").concat(passcode).concat("/").concat(phone).concat("/").concat(mail)), false);
        req.send(null);
        return req;
    }

    ///login/:mail/:passcode
    login(mail, passcode){
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/login/".concat(mail).concat("/").concat(passcode)), false);
        req.send(null);
        this.token = JSON.parse(req.response).token;
        return req;
    }

    getBeekeepers(){
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/api/getBeekeepers"), false);
        req.setRequestHeader("token",this.token);
        req.send(null);
        return req;
    }

    ///getReservation/:idApi
    getReservation(idApi){
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/api/getReservation".concat("/").concat(idApi)), false);
        req.setRequestHeader("token",this.token);
        req.send(null);
        return req;
    }

    ///cancelReservation/:idSwarm
    cancelReservation(idSwarm){
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/api/cancelReservation".concat("/").concat(idSwarm)), false);
        req.setRequestHeader("token",this.token);
        req.send(null);
        return req;
    }
}
