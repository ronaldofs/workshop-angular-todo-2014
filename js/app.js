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
    .factory('_', Lodash)
    .filter('priorityLabel', PriorityLabelFilter);

  function TodoListCtrl(_, TodoList, TodoFilters) {
    var ctrl = this;

    ctrl.todos = TodoList.items;
    ctrl.filters = TodoFilters;
    ctrl.selectedFilter = _.first(ctrl.filters);

    ctrl.getTotalTodos = getTotalTodos;
    ctrl.getTotalDone = getTotalDone;

    function getTotalTodos() {
      return TodoList.getTotalTodos();
    }

    function getTotalDone() {
      return TodoList.getTotalDone();
    }
  }

  function TodoList(_) {
    return {
      items: [],
      addTodo: addTodo,
      getTotalTodos: getTotalTodos,
      getTotalDone: getTotalDone
    };

    function addTodo(todo) {
      this.items.push(todo);
    }

    function getTotalTodos() {
      return _.where(this.items, { done: false }).length;
    }

    function getTotalDone() {
      return _.where(this.items, { done: true }).length;
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
    function Todo(title, done, priority) {
      this.title = title || '';
      this.done = done || false;
      this.priority = priority || 0;
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
          '<input type="number" min="0" max="2" ng-model="ctrl.newTodo.priority">' +
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

  function PriorityLabelFilter() {
    return function(priority) {
      labels = {0: 'Not important', 1: 'Somewhat important', 2: 'Important'};
      return labels[priority];
    };
  }

})();
