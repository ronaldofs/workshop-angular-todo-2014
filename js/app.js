(function() {
  // Define an angular module with a list of dependencies
  angular
    .module('app', [])
    .controller('TodoListCtrl', TodoListCtrl);

  function TodoListCtrl() {
    var ctrl = this;

    ctrl.todos = [];
    ctrl.newTodo = null;
    ctrl.addTodo = addTodo;

    function addTodo(todo) {
      ctrl.todos.push(todo);
      ctrl.newTodo = null;
    }
  }
})();
