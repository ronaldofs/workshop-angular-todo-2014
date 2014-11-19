(function() {
  // Define an angular module with a list of dependencies
  angular
    .module('app', [])
    .controller('TodoListCtrl', TodoListCtrl);

  function TodoListCtrl($scope) {
    $scope.todos = [];
    $scope.newTodo = null;

    $scope.addTodo = function(todo) {
      $scope.todos.push(todo);
      $scope.newTodo = null;
    };
  }
})();
