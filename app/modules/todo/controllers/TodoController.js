/* jshint unused: false */
/* jshint newcap: false */
(function() {
	'use strict';

	define([], function() {
		var TodoController = function( $scope, $filter, $modal, $System, todoModulePath, todoModel, ngTableParams) {

			$scope.addTodoItem = function() {
				todoModel.createNewItem();
				$scope.tableTodoList.reload();
			};

			$scope.ngTableBuilder = function(data) {
				return new ngTableParams({
					page: 1,
					count: 10,
					sorting: {
						'deadline': 'desc'
					}
				}, {
					total: data.length,
					getData: function($defer, params) {
						var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
						$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
					}
				});
			};

			$scope.dateFormat = 'dd.MM.yyyy';

			$scope.getTodoList = function() {
				$System.showLoader();

				todoModel.getTodoList().then(function(data) {
					$scope.todoList = data;
					$scope.tableTodoList = $scope.ngTableBuilder($scope.todoList);
					$System.hideLoader();
				}, function(reason) {
					$System.$appMessages.error('Błąd w pobieraniu listy TODO');
					$System.hideLoader();
				});
			};

			$scope.saveTodoList = function (todoList) {
				todoModel.saveTodoList(todoList).then(function() {
					$System.$appMessages.success('Zapisano listę todo');
				}, function(reason) {
					$System.$appMessages.error('Błąd w zapisywaniu listy TODO');
				});
			};

			$scope.showRemoveTodoModal = function(todoItem) {
				var modalScope = $scope.$new();
				modalScope.todo = todoItem;

				var modalInstance = $modal.open({
					templateUrl: todoModulePath + 'views/modals/todo-remove.html',
					scope: modalScope
				});

				modalInstance.result.then(function() {
					// test if todoItem is set
					removeTodo(todoItem);
				});
			};

			var removeTodo = function(todoItem) {
				todoModel.removeTodoItem(todoItem).then(function() {
					$scope.tableTodoList.reload();
				}, function(reason) {
					$System.$appMessages.error('Błąd w usuwaniu zadania z listy TODO');
				});
			};

			$scope.todoInit = function() {
				$scope.getTodoList();
			};
		};

		return [ '$scope', '$filter', '$modal', '$System', 'todoModulePath', 'todoModel', 'ngTableParams', TodoController ];
	});
}());

