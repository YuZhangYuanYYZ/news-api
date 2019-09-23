const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const url = "mongodb://localhost:27017/mydb";

let Todo = require("./models/TodoModel");
let TodoController = require("./controllers/TodoController");

mongoose.connect(url, { useNewUrlParser: true });
let dbconnect = mongoose.connection;
dbconnect.on("error", console.error.bind(console, "connection error:"));
dbconnect.once("open", function() {
  console.log("DB connection alive");
});

app.listen(process.env.PORT || 3004, () => {
  console.log("listening on 3004");
});

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  console.log("router is successful", Date.now());
  next();
});

app.use("/todos", router);
router.get(`/`, function(req, res) {
  TodoController.getTodos((err, result) => {
    if (err) {
      console.log(err, "can't get from api");
    } else {
      res.json(result);
    }
  });
});

router.post("/", (req, res) => {
  TodoController.saveTodo((err, savedTodo) => {
    if (err) {
      console.log(err, "can't save todo");
    } else {
      res.json(savedTodo);
    }
  });
});

router.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log(err, ObjectId(req.params._id), "can't post req.body");
    } else {
      res.json(result);
    }
  });
});

router.put("/:id", (req, res) => {
  Todo.findById({ _id: req.params.id }, (err, result) => {
    let newResult = result;
    newResult.completed = !result.completed;
    let todo = new Todo(newResult);
    todo.save(err => {
      if (err) {
        res.send(err);
      } else {
        res.json(newResult);
      }
    });
  });
});
