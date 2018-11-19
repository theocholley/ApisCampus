var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

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