const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let db;
const url = 'mongodb://localhost:27017/';
const mongoClient = new MongoClient(url);
mongoClient.connect().then((client) => {
    const DB_NAME = 'quotes';
    db = client.db(DB_NAME);
    app.listen(process.env.PORT || 3000, () => {
        console.log('listening on 3000')
    })
})

app.get('/quotes/:id', (req, res) => {
    const params = req.params;
    db.collection('quotes').find({ 'id': Number(params.id) }).toArray((err, result) => {
        if (err) return console.log(err)

        res.json(
            result.filter(element => element.id == params.id)
        )
    })
})

app.get('/quotes', (req, res) => {
    db.collection('quotes').find({}).toArray((err, result) => {
        if (err) return console.log(err)
        res.json(
            result
        )
        res.json();
    })
})

app.post('/quotes', (req, res) => {
    const body = req.body;
    db.collection('quotes').insertOne(body, (err, result) => {
        if (result) { res.json(body) }
    })
})

app.put('/quotes/:id', (req, res) => {
    const params = req.params;
    const body = req.body;
    const numberId = Number(params.id);

    db.collection('quotes').updateOne({ 'id': numberId }, { $set: body }, function (err, result) {

        console.log(result.matchedCount);

        db.collection('quotes').find({ 'id': numberId }).toArray((err, findResult) => {
            if (err) return console.log(err)
            const resultAfterPut = findResult.map(element => {
                return {
                    ...element,
                    author: body.author.toString()
                }
            });
            res.json(resultAfterPut);
        })
    })
})


app.delete('/quotes/:id', (req, res) => {
    const params = req.params;
    const numberId = Number(params.id);

    db.collection('quotes').deleteOne(
        {
            'id': numberId
        }, (err, result) => {
            if (result) { res.json(); }
        })
})

