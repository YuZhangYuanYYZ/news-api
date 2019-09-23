const Todo = require("../models/TodoModel");

const ToDoService = {
  getTodos: function getTodos(cb) {
    Todo.find((err, result) => {
      if (err) {
        return cb(err);
      } else {
        const sortedResult = result.reverse();
        return cb(null, sortedResult);
      }
    });
  },

  saveTodo: function saveTodo(cb) {
    let todo = new Todo(req.body);
    todo.save(err => {
      if (err) {
        return cb(err);
      } else {
        return cb(null, todo);
      }
    });
  }
};

module.exports = ToDoService;
