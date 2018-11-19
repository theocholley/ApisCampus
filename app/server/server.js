"use strict";

let Reclamation = require("./models/reclamation");
let ReclamList = require("./models/reclamList.js");

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');

const availableBuildings = ["000101","000102","000103","000201","000301","000302","000303","000304","000305","000306","000307","000308","000309","000310","000311","000312","000313","000400","000401","000402","000403","000404", "000405","000406","000407","000408","000409","000501","000502","000601","000602", "000603","000604", "000701","000702", "000703","000704","000705","000706" ,"000707","000708", "000709","000710" ,"000801","000900","000901","000902","001001","001101","001102","001103","001104","001201","001202","001203","001204","001205","001206","001207","001208","001209","001210","001301","001401","001402","001403","001501","001601","001602","001603","001604","001605","001701","001703","001704","001801","001802","001901","001902","001903","001904","002001","002002","002003","002004","002005","002006","002201","002202","002301","002302","002303","002304","002305","002306","002307","002401","002402","002501","002502","002503","002504","002505","002506","002507","002508","002509","002601","002602","002603","002604","002605","002606","002607","002701","002702","002703","002801","002802","002803","002804","002805","002806","002807","002808","002809","002810","002811","002812","002813","002814","002815","002816","002817","002818","002819","002820","002821","002822","002823","002824","002825","002826","002827","002828","002829","002830","002831","002832","002833","002834","002835","002836","002837","002838","002839","002840","002841","002842","002843","002844","002845","002846","002847","002848","002849","002850","002851","002852","002853","002854","002855","002856","002857","002858","002859","002860","002861","002862","002863","002864","002865","002866","002867","002868","002869","002870","002871","002872","002873","002874","002875","002876","002877","002878","002879","002880","002881","002882","002901","002902","002903","002904","002905","002906","002907","002908","002909","002910","002911","002912","002913","002914","002915","002916","002917","002918","002919","002920","002921","002922","002923","002924","002925","002926","002927","002928","003001","003002","003003","003004","003101","003102","003329","003330","003331","003332","003333","003334","003335","003336","003401","003402","003601","003602","003701","003702","003703","003704","003705","003706","003801","004001","004002","004003","004401","004501","004800","004801","004901","005000","005101","005201","005202","005300","005401","005501","005601","005700","005801","005900","006001","006002","006003","006004","006005","006006","006101","006201","006202","006301","006302","006401","006601","006901","007201","007301","007302","007303","007304","007401","007501","007502","007503","007504","007505","007506","007601","007701","007801","007901","008001","008101","008401","008701","008801","009001","009002","009003","009004","009005","009006","009100","009301","009302","009600","009701","009901","009902","010100","010301","010400","011001","011101","011201","011301","011302","011303","011401","011601","011701","011800","011901","012001","012301","012901","013001","013101","013201","013501","013601","013701","014001","014002","014201","014202","014203","014204","014205","014206","014207","014208","014209","014501","014601","014901","016301","016400","016401","016501","016601","016700","016801","016901","017001","017101","017201","017401","017501","017901","018001","018201","018204","018205","018206","018207","018308","018309","018401","018501","018502","018601","018701","018801","018901","019001","019101","019301","019401","019500","019701","019801","019802","019803","019901","020001","020201","020401","020501"]


var content = "GROUPE,NB_RECLAM\n";

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use(express.static('media'));

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("db");
    dbo.createCollection("reclamations", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("db");
    var myobj = { name: "Coucou", address: "Thib" };
    dbo.collection("reclamations").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("Reclam créée");
        db.close();
    });
});

console.log("Reclam - THM Server");

const http = require('http').Server(app);
const server = app.listen(process.env.PORT || 8080);
var reclamList = new ReclamList;

/**
 * Partie API
 */


app.get('/createReclam/:group/:building/:flat/:content', function (req, res) {

    const id = reclamList.getSize();
    const group = req.params.group.toLowerCase();
    const building = req.params.building.toLowerCase();
    const flat = req.params.flat.toLowerCase();
    const content = req.params.content.toLowerCase();

    var reclam = new Reclamation(id, group, building, flat, content);
    reclamList.push(reclam);
    createCSV();
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("db");
        var myobj = { id: id, group: group, building: building, flat: flat, content: content };
        dbo.collection("reclamations").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("Reclam créée");
            db.close();
        });
    });
    res.send({
        passed: true,
        reclam: reclam
    });
});

function getBuilding(building) {
    var nb = 0;
    for (var i = 0; i < reclamList.getList().length; i++) {
        if (reclamList.getList()[i].getBuilding() == building) {
            nb++;
        }
    }
    return nb;
}

function createCSV() {
    for (var i = 0; i < availableBuildings.length; i++) {
        content+="'"+availableBuildings[i]+";"+getBuilding(availableBuildings[i])+"\n";
    }
    var fs = require('fs');
    fs.writeFile("file/reclam.csv", content, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
        content = "GROUPE;NB_RECLAM\n";
    });
}