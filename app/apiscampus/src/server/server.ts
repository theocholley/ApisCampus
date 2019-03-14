import * as Constants from '../utils/constants';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

declare var require: any;

export class Server {

    path: string;
    port: string;
    token: string;
    config = {
        headers: {
            'token': this.token
        }
    };

    constructor(private http: HttpClient) {
        this.path = Constants.PATHSERV;
        this.port = ':' + Constants.PORT;
        this.token = "";
    }

    getAllPath() {
        return this.path.concat(this.port);
    }

    //METHODES GET

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

    getSwarms(): Observable<any> {
        return this.http.get(this.path + '/api/getSwarms', this.config);
    }

    getAvailableSwarms(): Observable<any> {
        return this.http.get(this.path + '/api/getAvailableSwarms', this.config);
    }

    login(mail, passcode): Observable<any> {
        return this.http.get(this.path + '/login/' + mail + "/" + passcode, this.config);
    }

    getBeekeepers(): Observable<any> {
        return this.http.get(this.path + '/api/getBeekeepers', this.config);
    }

    getReservation(idApi): Observable<any> {
        return this.http.get(this.path + '/api/getReservation/' + idApi, this.config);
    }

    //METHODES POST
    addSwarm(longitude, latitude, date, hour, feature, height, description, numberObs, size, insectType, pic, idDevice) {
        let county = this.getCounty(latitude, longitude);
        let obj = {
            longitude: longitude,
            latitude: latitude,
            date: date,
            hour: hour,
            feature: feature,
            height: height,
            description: description,
            county: county,
            numberObs: numberObs,
            size: size,
            insectType: insectType,
            pic: pic,
            idDevice: idDevice
        };

        (async () => {
            const response = await fetch(this.getAllPath().concat('/addSwarm/'), {
                headers: {
                    'token': this.token
                },
                method: 'POST',
                body: JSON.stringify(obj)
            });
        })();
    }

    retrieve(idSwarm) {
        let obj = {
            idSwarm: idSwarm
        };

        (async () => {
            const response = await fetch(this.getAllPath().concat('/api/retrieve'), {
                headers: {
                    'token': this.token
                },
                method: 'POST',
                body: JSON.stringify(obj)
            });
        })();
    }

    treat(idApi, idSwarm) {
        let obj = {
            idApi: idApi,
            idSwarm: idSwarm
        };

        (async () => {
            const response = await fetch(this.getAllPath().concat('/api/treat'), {
                headers: {
                    'token': this.token
                },
                method: 'POST',
                body: JSON.stringify(obj)
            });
        })();
    }

    addBeekeeper(name, surname, latCentre, longCentre, ray, passcode, phone, mail) {
        let obj = {
            name: name,
            surname: surname,
            latCentre: latCentre,
            longCentre: longCentre,
            ray: ray,
            passcode: passcode,
            phone: phone,
            mail: mail
        };

        (async () => {
            const response = await fetch(this.getAllPath().concat('/createBeekeeper'), {
                headers: {
                    'token': this.token
                },
                method: 'POST',
                body: JSON.stringify(obj)
            });
        })();
    }

    cancelReservation(idSwarm) {
        let obj = {
            idSwarm: idSwarm,
        };

        (async () => {
            const response = await fetch(this.getAllPath().concat('/api/cancelReservation'), {
                headers: {
                    'token': this.token
                },
                method: 'POST',
                body: JSON.stringify(obj)
            });
        })();
    }
}
