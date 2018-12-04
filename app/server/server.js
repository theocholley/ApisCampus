"use strict";

let Swarm = require("./models/swarm");
let SwarmList = require("./models/swarmList");

var fs = require('fs');

let Beekeeper = require("./models/beekeeper");
let BeekeeperList = require("./models/beekeeperList");

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use(express.static('media'));
var ref = new Date();

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("ApisCampus");
    dbo.createCollection("swarms", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("ApisCampus");
    dbo.createCollection("beekeepers", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("ApisCampus");
    dbo.createCollection("reservations", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

console.log("ApisCampus - Server");
console.log("Connecting ...")

const http = require('http').Server(app);
const server = app.listen(process.env.PORT || 8080);
var swarmList = new SwarmList();
var beekeeperList = new BeekeeperList();


/**
 * Partie API
 */

//(id, longitude, latitude, date, hour, feature, height, description, isTreated)
app.get('/addSwarm/:longitude/:latitude/:date/:hour/:feature/:height/:description/:county/:numberObs/:size/:insectType/:pic', function (req, res) {
    const id = swarmList.getSize();
    const longitude = req.params.longitude;
    const latitude = req.params.latitude;
    const date = req.params.date;
    const hour = req.params.hour;
    const feature = req.params.feature;
    const height = req.params.height;
    const description = req.params.description;
    const county = req.params.county;
    const numberObs = req.params.numberObs;
    const size = req.params.size;
    const insectType = req.params.insectType;
    const pic = req.params.pic;

    var swarm = new Swarm(id, longitude, latitude, date, hour, feature, height, description, county, numberObs, size, insectType, pic);
    swarmList.push(swarm);


    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var newSwarm = {
            id: id,
            longitude: longitude,
            latitude: latitude,
            date: date,
            hour: hour,
            feature: feature,
            height: height,
            description: description,
            county: county,
            numberObs: numberObs,
            isTreated: false,
            size: size,
            insectType: insectType,
            pic: pic
        };
        dbo.collection("swarms").insertOne(newSwarm, function (err, res) {
            if (err) throw err;
            console.log("Essaim ajouté");
            db.close();
        });
    });
    res.send({
        passed: true,
        swarm: swarm
    });
    generateCsv();
});

app.get('/getSwarms', function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        dbo.collection("swarms").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send({
                passed: true,
                result: result
            });
            db.close();
        });
    });
});

app.get('/getMySwarms/:numberObs', function (req, res) {
    const numberObs = req.params.numberObs;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var query = {numberObs: numberObs};
        dbo.collection("swarms").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.send({
                passed: true,
                result: result
            });
        });
    });

});

//Partie Beekeeper
//Nom, Prénom, Ville, Rayon, mdp, no telephone.
app.get('/createBeekeeper/:name/:surname/:latCentre/:longCentre/:ray/:passcode/:phone/:mail', function (req, res) {
    const id = beekeeperList.getSize();
    const name = req.params.name;
    const surname = req.params.surname;
    const latCentre = req.params.latCentre;
    const longCentre = req.params.longCentre;
    const ray = req.params.ray;
    const passcode = req.params.passcode;
    const phone = req.params.phone;
    const mail = req.params.mail;


    var alreadyExists = false;
    var beekeeper = new Beekeeper(id, name, surname, latCentre, longCentre, ray, passcode, phone, mail);
    for (var i = 0; i < beekeeperList.getSize(); i++) {
        if (beekeeperList.getList()[i].getMail() === beekeeper.getMail()) {
            alreadyExists = true;
        }
    }

    if (alreadyExists) {
        res.send({
            passed: false
        });
    } else {
        beekeeperList.push(beekeeper);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("ApisCampus");
            var newBeekeeper = {
                id: id,
                name: name,
                surname: surname,
                latCentre: latCentre,
                longCentre: longCentre,
                ray: ray,
                passcode: passcode,
                phone: phone,
                mail: mail
            };
            dbo.collection("beekeepers").insertOne(newBeekeeper, function (err, res) {
                if (err) throw err;
                console.log("Apiculteur ajouté");
                db.close();
            });
        });
        res.send({
            passed: true,
            idBeekeeper: id
        });
    }
});

app.get('/login/:mail/:passcode', function (req, res) {
    const mail = req.params.mail;
    const passcode = req.params.passcode;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var query = {mail: mail, passcode: passcode};
        dbo.collection("beekeepers").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.send({
                passed: true,
                result: result
            });
        });
    });

});

function generateCsv() {
    var content = "ID;LONGITUDE;LATITUDE;DATE;HOUR;FEATURE;HEIGHT;DESCRIPTION;COUNTY;NUMBER_OBS;ISTREATED;SIZE;INSECT_TYPE\n";
    console.log("size : " + swarmList.getSize());
    for (var i = 0; i < swarmList.getSize(); i++) {
        console.log(swarmList.getList());
        var currentSwarm = swarmList.getList()[i];
        content += currentSwarm.getId() + ";" + currentSwarm.getLongitude() + ";" + currentSwarm.getLatitude() + ";" + currentSwarm.getDate() + ";" + currentSwarm.getHour() + ";" + currentSwarm.getFeature() + ";" + currentSwarm.getHeight() + ";" + currentSwarm.getDescription() + ";" + currentSwarm.getCounty() + ";" + currentSwarm.getNumberObs() + ";" + currentSwarm.isTreated() + ";" + currentSwarm.getSize() + ";" + currentSwarm.getInsectType() + "\n";
    }
    fs.writeFile("file/swarms.csv", content, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

app.get('/getBeekeepers', function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        dbo.collection("beekeepers").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send({
                passed: true,
                result: result
            });
            db.close();
        });
    });
});

//Partie reservation

app.get('/treat/:idApi/:idSwarm', function (req, res) {
    const idApi = req.params.idApi;
    const idSwarm = req.params.idSwarm;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var newReservation = {
            idApi: idApi,
            idSwarm: idSwarm,
            date: ref.getTime()
        };
        dbo.collection("reservations").find({$or: [{idApi: idApi}, {idSwarm: idSwarm}]}).toArray(function (err, result) {
            if (err) throw err;
            if (result.length === 0) {
                dbo.collection("reservations").insertOne(newReservation, function (err, res) {
                    if (err) throw err;
                    console.log("Reservation ajoutée");
                    db.close();
                });
                res.send({
                    passed: true,
                });
                var myquery = {id: +idSwarm};
                var newvalues = {$set: {isTreated: true}};
                dbo.collection("swarms").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("L'essaim a été mis à jour");
                    db.close();
                });
            } else {
                res.send({
                    passed: false,
                });
            }
            db.close();
        });
    });
});

function updateReservations() {
    let currentDate = ref.getTime();
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = {date: {$lt: currentDate - 54000000}};//54000000 == 15h : current - date > 15h ==> on supprime
        dbo.collection("reservations").deleteMany(myquery, function (err, obj) {
            if (err) throw err;
            console.log("documents deleted");
            db.close();
        });
    });
}

setInterval(updateReservations, 3600000);

var nbResa;
var nbTot;
app.get('/getReservationsDetails', function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        dbo.collection("reservations").find({}).toArray(function (err, result) {
            if (err) throw err;
            nbResa = result.length;
            console.log(result.length);
        });
        dbo.collection("swarms").find({}).toArray(function (err, result) {
            if (err) throw err;
            nbTot = result.length;
            console.log(result.length);
        });
        db.close();
    });
    res.send({
        passed: true,
        nbResa: nbResa,
        nbTot: nbTot
    })
});
