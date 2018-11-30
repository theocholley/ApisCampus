export class Server {

    path: string;
    port: string;

    constructor() {
      this.path = "http://localhost:";
      //this.path = "http://192.168.1.21:";
      this.port = "8080";
    }

    getAllPath() {
        return this.path.concat(this.port);
    }

    ///addSwarm/:longitude/:latitude/:date/:hour/:feature/:height/:description/:county/:numberObs
    addSwarm(longitude, latitude, date, hour, feature, height, description, county, numberObs, size, insectType, pic) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/addSwarm/".concat(longitude).concat("/").concat(latitude).concat("/").concat(date).concat("/").concat(hour).concat("/").concat(feature).concat("/").concat(height).concat("/").concat(description).concat("/").concat(county).concat("/").concat(numberObs).concat("/").concat(size).concat("/").concat(insectType).concat("/").concat(pic)), false);
        req.send(null);
        return req;
    }

    getSwarms() {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/getSwarms"), false);
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

    getBeekeepers(){
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/getBeekeepers"), false);
        req.send(null);
        return req;
    }

}
