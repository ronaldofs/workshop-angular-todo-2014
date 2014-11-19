(function() {
  // Define an angular module with a list of dependencies
  angular
    .module('app', [])
    .controller('TodoListCtrl', TodoListCtrl)
    .factory('TodoList', TodoList)
    .constant('TodoFilters', _getTodoFilters())
    .value('TodoModel', _getTodoModel());

  function TodoListCtrl(TodoList, TodoFilters, TodoModel) {
    var ctrl = this;

    ctrl.todos = TodoList.items;
    ctrl.newTodo = new TodoModel();
    ctrl.addTodo = addTodo;

    ctrl.filters = TodoFilters;
    ctrl.selectedFilter = ctrl.filters[0];

    function addTodo(todo) {
      TodoList.addTodo(todo);

      ctrl.newTodo = new TodoModel();
    }
  }

  function TodoList() {
    return {
      items: [],
      addTodo: addTodo
    };

    function addTodo(todo) {
      this.items.push(todo);
    }
  }

  function _getTodoFilters() {
    var filters = [
      { title: 'All' },
      { title: 'Todo', value: { done: false } },
      { title: 'Done', value: { done: true } }
    ];

    return filters;
  }

  function _getTodoModel() {
    function Todo(title, done) {
      this.title = title || '';
      this.done = done || false;
    }

    return Todo;
  }

})();
