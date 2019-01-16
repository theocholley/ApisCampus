const chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var should = require('should');
const apiAdress = 'http://localhost:8080';

var assert = require('assert'),
    http = require('http');


/*****************
 * Server Requests
 *****************/

describe('addSwarm', function () {
    before(function () {

    });
    it('add a swarm in the DB with the expected status code 200', function (done) {
        chai.request(apiAdress)
            .get('/addSwarm/latitude/longitude/date/hour/feature/height/description/county/numberObs/size/insectType/pic/idDevice')
            .send(null)
            .then(function (res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('createBeekeeper', function () {
    var mail;
    before(function () {
        mail = randomPseudo();
    });
    it('create a beekeeper with status code 200', function (done) {
        chai.request(apiAdress)
            .get('/createBeekeeper/pseudo/surname/latCentre/longCentre/ray/passcode/phone/'+mail)
            .send(null)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(JSON.parse(res.text).passed ).equals(true);
                done();
            });
    });

    it('should exit with statut code 200 beekeeper already known and passed : false', function (done) {
        chai.request(apiAdress)
            .get('/createBeekeeper/pseudo/surname/latCentre/longCentre/ray/passcode/phone/'+mail)
            .send(null)
            .then(function (res) {
                expect(JSON.parse(res.text).passed ).equals(false);
                done();
            });
    });
});


describe('login', function () {
    var mail;
    before(function () {
        mail = randomPseudo();
        chai.request(apiAdress)
            .get('/createBeekeeper/pseudo/surname/latCentre/longCentre/ray/passcode/phone/'+mail)
            .send(null)
            .then(function (res) {
            });
    });
    it('create a beekeeper with status code 200', function (done) {
        chai.request(apiAdress)
            .get('/login/'+mail+'/passcode')
            .send(null)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(JSON.parse(res.text).passed ).equals(true);
                done();
            });
    });

    it('should exit with statut code 200 and passed false if not already created', function (done) {
        mail = randomPseudo();
        chai.request(apiAdress)
            .get('/login/'+mail+'/passcode')
            .send(null)
            .then(function (res) {
                expect(JSON.parse(res.text).passed ).equals(false);
                done();
            });
    });
});


function randomPseudo() {
    return Math.random().toString(36).substr(2);
}