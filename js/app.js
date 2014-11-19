(function() {
  // Define an angular module with a list of dependencies
  angular
    .module('app', [])
    .controller('TodoListCtrl', TodoListCtrl)
    .factory('TodoList', TodoList);

  function TodoListCtrl(TodoList) {
    var ctrl = this;

    ctrl.todos = TodoList.items;
    ctrl.newTodo = null;
    ctrl.addTodo = addTodo;

    ctrl.filters = [
      { title: 'All' },
      { title: 'Todo', value: { done: false } },
      { title: 'Done', value: { done: true } }
    ];
    ctrl.selectedFilter = ctrl.filters[0];

    function addTodo(todo) {
      TodoList.addTodo(todo);

      ctrl.newTodo = null;
    }
  }

  function TodoList() {
    return {
      items: [],
      addTodo: addTodo
    };

    function addTodo(todo) {
      this.items.push({
        title: todo.title,
        done: false
      });
    }
  }

})();
