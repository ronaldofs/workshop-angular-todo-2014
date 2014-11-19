(function() {
  // Define an angular module with a list of dependencies
  angular
    .module('app', [])
    .controller('TodoListCtrl', TodoListCtrl)
    .factory('TodoList', TodoList)
    .constant('TodoFilters', _getTodoFilters())
    .value('TodoModel', _getTodoModel())
    .directive('gbTodoForm', TodoForm)
    .controller('TodoFormCtrl', TodoFormCtrl)
    .factory('_', Lodash);

  function TodoListCtrl(_, TodoList, TodoFilters) {
    var ctrl = this;

    ctrl.todos = TodoList.items;
    ctrl.filters = TodoFilters;
    ctrl.selectedFilter = _.first(ctrl.filters);
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

  function TodoForm() {
    return {
      restrict: 'A',
      scope: true,
      template:
        '<form name="todoForm" class="gb-todo-form">' +
          '<input type="text" ng-model="ctrl.newTodo.title" required>' +
          '<button ng-click="ctrl.addTodo()" ng-disabled="todoForm.$invalid">Add new todo</button>' +
        '</form>',
      controller: 'TodoFormCtrl',
      controllerAs: 'ctrl'
    };
  }

  function TodoFormCtrl(TodoModel, TodoList) {
    var ctrl = this;

    ctrl.newTodo = new TodoModel();
    ctrl.addTodo = addTodo;

    function addTodo() {
      TodoList.addTodo(ctrl.newTodo);

      ctrl.newTodo = new TodoModel();
    }
  }

  function Lodash() {
    return window._;
  }

})();
