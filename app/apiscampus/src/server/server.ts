/**
 * Created by thiba on 29/05/2018.
 */

export class Server {

  path : string;
  port: string;

  constructor() {
    this.path ="http://localhost:";
    this.port = "8080";
  }

  getAllPath(){
    return this.path.concat(this.port);
  }
    ///addSwarm/:longitude/:latitude/:date/:hour/:feature/:height/:description
    addSwarm(longitude,latitude,date,hour,feature,height,description) {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/addSwarm/".concat(longitude).concat("/").concat(latitude).concat("/").concat(date).concat("/").concat(hour).concat("/").concat(feature).concat("/").concat(height).concat("/").concat(description)), false);
        req.send(null);
        return req;
    }

    getSwarms() {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/getSwarms"), false);
        req.send(null);
        return req;
    }

  /*

  getNbReclam(bat){
    ///getNbReclam/:bat
    var req = new XMLHttpRequest();
    req.open("GET", this.getAllPath().concat("/getNbReclam/".concat(bat)), false);
    req.send(null);
    return req;
  }

  ///createReclam/:group/:building/:flat/:content
  createReclam(group,building,flat,content) {
    var req = new XMLHttpRequest();
    req.open("GET", this.getAllPath().concat("/createReclam/".concat(group).concat("/").concat(building).concat("/").concat(flat).concat("/").concat(content)), false);
    req.send(null);
    return req;
  }

    getList() {
        var req = new XMLHttpRequest();
        req.open("GET", this.getAllPath().concat("/getList"), false);
        req.send(null);
        return req;
    }

    */
}
