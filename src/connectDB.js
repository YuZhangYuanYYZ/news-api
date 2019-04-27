var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var db = client.db('retail');
    // Find some documents
    var collection = db.collection('inventory');
    collection.find({}).toArray(function (err, docs) {
        console.log("Found the following records");
        console.log(docs)
        client.close();
    });
});