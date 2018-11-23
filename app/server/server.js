"use strict";

let Swarm = require("./models/swarm");
let SwarmList = require("./models/swarmList");

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
app.get('/addSwarm/:longitude/:latitude/:date/:hour/:feature/:height/:description/:county', function (req, res) {
    const id = swarmList.getSize();
    const longitude = req.params.longitude;
    const latitude = req.params.latitude;
    const date = req.params.date;
    const hour = req.params.hour;
    const feature = req.params.feature;
    const height = req.params.height;
    const description = req.params.description;
    const county = req.params.county;

    var swarm = new Swarm(id, longitude, latitude, date, hour, feature, height, description, county);
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
            isTreated: false
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

app.get('/updateLongitude/:id/:val', function (req, res) {
    const id = req.params.id;
    const value = req.params.val;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = {id: +id};
        var newvalues = {$set: {longitude: value}};
        dbo.collection("swarms").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("L'essaim a été mis à jour");
            db.close();
        });
    });
});

app.get('/updateLatitude/:id/:val', function (req, res) {
    const id = req.params.id;
    const value = req.params.val;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = {id: +id};
        var newvalues = {$set: {latitude: value}};
        dbo.collection("swarms").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("L'essaim a été mis à jour");
            db.close();
        });
    });
});

app.get('/updateDate/:id/:val', function (req, res) {
    const id = req.params.id;
    const value = req.params.val;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = {id: +id};
        var newvalues = {$set: {date: value}};
        dbo.collection("swarms").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("L'essaim a été mis à jour");
            db.close();
        });
    });
});

app.get('/updateHour/:id/:val', function (req, res) {
    const id = req.params.id;
    const value = req.params.val;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = {id: +id};
        var newvalues = {$set: {hour: value}};
        dbo.collection("swarms").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("L'essaim a été mis à jour");
            db.close();
        });
    });
});

app.get('/updateFeature/:id/:val', function (req, res) {
    const id = req.params.id;
    const value = req.params.val;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = {id: +id};
        var newvalues = {$set: {feature: value}};
        dbo.collection("swarms").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("L'essaim a été mis à jour");
            db.close();
        });
    });
});

app.get('/updateHeight/:id/:val', function (req, res) {
    const id = req.params.id;
    const value = req.params.val;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = {id: +id};
        var newvalues = {$set: {height: value}};
        dbo.collection("swarms").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("L'essaim a été mis à jour");
            db.close();
        });
    });
});

app.get('/updateDescription/:id/:val', function (req, res) {
    const id = req.params.id;
    const value = req.params.val;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = {id: +id};
        var newvalues = {$set: {description: value}};
        dbo.collection("swarms").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("L'essaim a été mis à jour");
            db.close();
        });
    });
});

app.get('/updateCounty/:id/:val', function (req, res) {
    const id = req.params.id;
    const value = req.params.val;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = {id: +id};
        var newvalues = {$set: {description: value}};
        dbo.collection("swarms").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("L'essaim a été mis à jour");
            db.close();
        });
    });
});

app.get('/treat/:id', function (req, res) {
    const id = req.params.id;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = {id: +id};
        var newvalues = {$set: {isTreated: true}};
        dbo.collection("swarms").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("L'essaim a été mis à jour");
            db.close();
        });
    });
});

app.get('/deleteSwarm/:id', function (req, res) {
    const id = req.params.id;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var myquery = { id: +id };
        dbo.collection("swarms").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("L'essaim a été supprimé !");
            db.close();
        });
    });
});

//Partie Beekeeper
//Nom, Prénom, Ville, Rayon, mdp, no telephone.
app.get('/createBeekeeper/:name/:surname/:city/:ray/:passcode/:phone', function (req, res) {
    const id = beekeeperList.getSize();
    const name = req.params.name;
    const surname = req.params.surname;
    const city = req.params.city;
    const ray = req.params.ray;
    const passcode = req.params.passcode;
    const phone = req.params.phone;

    var beekeeper = new Beekeeper(id, name, surname, city, ray, passcode, phone);
    beekeeperList.push(beekeeper);


    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ApisCampus");
        var newBeekeeper = {
            id: id,
            name: name,
            surname: surname,
            city: city,
            ray: ray,
            passcode: passcode,
            phone: phone
        };
        dbo.collection("beekeepers").insertOne(newBeekeeper, function (err, res) {
            if (err) throw err;
            console.log("Apiculteur ajouté");
            db.close();
        });
    });
    res.send({
        passed: true,
        swarm: swarm
    });
});