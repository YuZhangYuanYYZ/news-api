const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
//对body-parser进行配置
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
mongoClient.connect().then(client => {
  const DB_NAME = "quotes";
  db = client.db(DB_NAME);
  app.listen(process.env.PORT || 3004, () => {
    console.log("listening on 3004");
  });
});

app.get("/quotes", (req, res) => {
  db.collection("quotes")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.json({
        quotes: result
      });
    });
});

app.post("/quotes", (req, res) => {
  db.collection("quotes").save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log("saved to database");
    res.json(result);
  });
});

app.put("/quotes/:id", (req, res) => {
  db.collection("quotes").findOneAndUpdate(
    {
      name: "Yoda"
    },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    },
    {
      sort: {
        _id: -1
      },
      upsert: true
    },
    (err, result) => {
      if (err) return res.send(err);
      res.json(result);
    }
  );
});

app.delete("/quotes/:id", (req, res) => {
  db.collection("quotes").findOneAndDelete(
    {
      name: req.body.name
    },
    (err, result) => {
      if (err) return res.send(500, err);
      res.json("A darth vadar quote got deleted");
    }
  );
});
