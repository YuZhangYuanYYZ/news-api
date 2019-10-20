const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
//const MongoClient = require('mongodb').MongoClient;
const app = express();
const bodyParser = require("body-parser");
//对body-parser进行配置
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const url = "mongodb://localhost:27017/mydb";
let Todo = require("./todo/models/TodoModel");

mongoose.connect(url, { useNewUrlParser: true });
let dbconnect = mongoose.connection;
dbconnect.on("error", console.error.bind(console, "connection error:"));
dbconnect.once("open", function() {
  console.log("DB connection alive");
});
// Use connect method to connect to the Server
app.listen(process.env.PORT || 3004, () => {
  console.log("listening on 3004");
});

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log("router is successful", Date.now());
  next();
});

app.use("/todos", router);
router.get(`/`, function(req, res) {
  Todo.find((err, result) => {
    if (err) {
      console.log(err, "can't get from api");
    } else {
      console.log(result, "result");
      res.json(result);
    }
  });
});

router.post("/", (req, res) => {
  let todo = new Todo(req.body);
  console.log(req.body, "req.body");
  todo.save(err => {
    if (err) {
      console.log(err, "can't post req.body");
    } else {
      res.json(todo);
    }
  });
});

// router.route('/todos/:id')
router.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log(err, ObjectId(req.params._id), "can't post req.body");
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

router.put("/:id", (req, res) => {
  Todo.findById({ _id: req.params.id }, (err, result) => {
    let newResult = result;

    newResult.dueTime = req.body.dueTime;
    newResult.completed = req.body.completed
      ? req.body.completed
      : newResult.completed;

    let todo = new Todo(newResult);
    todo.save((err, product) => {
      if (err) {
        res.send(err);
      } else {
        res.json(product);
      }
    });
  });
});

// curl -X PUT -H "Content-Type: application/json" -d '{"completed":true}' "http://127.0.0.1:3004/todos/5d93323c16ced9e3d11ba10c"
//curl http://localhost:3004/todos

//   curl -X DELETE "http://localhost:3004/todos/5da487672c60841361004698"

// curl -X POST -H "Content-Type: application/json" -d '{"text": "hello 33333", "completed":false}' "http://127.0.0.1:3004/todos"
