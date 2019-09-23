const TodoService = require("../services/TodoService");

const ToDoController = {
  getTodos: function getTodos(cb) {
    ToDoService.getTodos(cb);
  },

  saveTodo: function saveTodo(cb) {
    ToDoService.saveTodo(cb);
  }
};

module.exports = ToDoController;
