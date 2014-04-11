/*jshint unused: vars */
(function() {
	'use strict';

	define(['angular', 'angularMocks', 'app'], function(angular, mocks, app) {

		describe('todo Controller', function() {
			var $rootScope, $scope, mockData, $q, $System,
			$config, createTodoController, todoModel,
			modalMock, modalDfd;

			beforeEach(module('Todo.services'));
			angular.module('Todo.services').constant('todoModulePath', 'todoModulePath');

			angular.module('Todo.services').service('ngTableParams',function() {
				var ngTableParams = function (baseParameters, baseSettings) {
					this.data = [];
				};
				return ngTableParams;
			});

			beforeEach(module('Todo.controllers'));

			beforeEach(inject(function($injector) {
				$config = $injector.get('$config');
				todoModel = $injector.get('todoModel');
				$rootScope = $injector.get('$rootScope');
				$q = $injector.get('$q');

				$scope = $rootScope.$new();
				mockData = [];
				mockData.push({name: 'todo1', deadline: new Date(2014, 4, 1)});
				mockData.push({name: 'todo2', deadline: new Date(2015, 4, 5)});
				mockData.push({name: 'todo3', deadline: new Date(2014, 4, 2)});

				$System = {};
				$System.hideLoader = function(){};
				$System.showLoader = function(){};
				$System.$exceptionHandler = function(){};
				$System.$exceptionHandler = function(){};
				$System.$appMessages = {
					error : function(){},
					success : function(){},
					warning : function(){}
				};
				$System.$locale = { getT : function(){}};

				spyOn($System, 'showLoader');
				spyOn($System, 'hideLoader');
				spyOn($System, '$exceptionHandler');
				spyOn($System.$appMessages, 'error');
				spyOn($System.$appMessages, 'success');
				spyOn($System.$appMessages, 'warning');
				spyOn($System.$locale, 'getT');

				modalMock = jasmine.createSpyObj('$modal', ['open', 'close', 'dismiss']);
				modalMock.open.andCallFake(function(){
					modalDfd = $q.defer();
					return {result: modalDfd.promise};
				});

				var $controller = $injector.get('$controller');

				createTodoController = function() {
					return $controller('TodoController', {
						'$scope' : $scope,
						'todoModel': todoModel,
						'$System': $System,
						'$modal': modalMock,
					});
				};

				// create controller instance before each test
				createTodoController();
			}));

			afterEach(function() {
			});

			describe('TodoController', function() {

				it('should get todoList on todoInit', function() {
					expect($scope.todoList).toBe(undefined);
					spyOn($scope, 'getTodoList');
					$scope.todoInit();
					expect($scope.getTodoList).toHaveBeenCalled();
				});

				// Get todo list
				it('should populate todoList on getTodoList', function() {
					var dfd = $q.defer();

					// sanity check
					expect($scope.todoList).toBe(undefined);

					// we don't care about model
					spyOn(todoModel, 'getTodoList').andReturn(dfd.promise);

					// run method under test
					$scope.getTodoList();

					// resolve promise
					dfd.resolve(mockData);

					// let angular know that promise has been resolved
					$scope.$digest();

					// test our assertions
					expect($scope.todoList.length).toEqual(mockData.length);
					expect(todoModel.getTodoList).toHaveBeenCalled();
					expect($System.showLoader).toHaveBeenCalled();
					expect($System.hideLoader).toHaveBeenCalled();
				});
				
				it('should show error message on getTodoList fail', function() {
					var dfd = $q.defer();

					expect($scope.todoList).toBe(undefined);

					spyOn(todoModel, 'getTodoList').andReturn(dfd.promise);
					$scope.getTodoList();
					dfd.reject(new Error('fail'));
					$scope.$digest();

					// shouldn't populate todo list
					expect($scope.todoList).toBe(undefined);
					expect($System.showLoader).toHaveBeenCalled();
					expect($System.hideLoader).toHaveBeenCalled();
					// shoule show error message
					expect($System.$appMessages.error).toHaveBeenCalled();
				});

				it('should remove item after accepting modal', function(){
					var dfd = $q.defer();
					var todoItem = {name: 'todo item'};
					spyOn(todoModel, 'removeTodoItem').andReturn(dfd.promise);
					$scope.showRemoveTodoModal(todoItem);
					modalDfd.resolve();
					$scope.$digest();
					expect(modalMock.open).toHaveBeenCalled();
					expect(todoModel.removeTodoItem).toHaveBeenCalledWith(todoItem);
				});
				
				it('should not remove item after dismissing modal', function(){
					var dfd = $q.defer();
					var todoItem = {name: 'todo item'};
					spyOn(todoModel, 'removeTodoItem').andReturn(dfd.promise);
					$scope.showRemoveTodoModal(todoItem);
					modalDfd.reject();
					$scope.$digest();
					expect(modalMock.open).toHaveBeenCalled();
					expect(todoModel.removeTodoItem).not.toHaveBeenCalledWith(todoItem);
				});

				it('should show success message after saving todoList', function() {
					var dfd = $q.defer();
					spyOn(todoModel, 'saveTodoList').andReturn(dfd.promise);
					$scope.saveTodoList(mockData);
					dfd.resolve();
					$scope.$digest();
					expect(todoModel.saveTodoList).toHaveBeenCalledWith(mockData);
					expect($System.$appMessages.success).toHaveBeenCalled();
				});
				
				it('should show error msg during failed save', function() {
					var dfd = $q.defer();
					spyOn(todoModel, 'saveTodoList').andReturn(dfd.promise);
					$scope.saveTodoList(mockData);
					dfd.reject();
					$scope.$digest();
					expect(todoModel.saveTodoList).toHaveBeenCalledWith(mockData);
					expect($System.$appMessages.error).toHaveBeenCalled();
				});
			});

		});
	});
}());
