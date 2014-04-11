/*jshint indent: false */
/*jshint quotmark: false */
/*jshint unused: false */
/*jshint sub:true*/

(function() {
	'use strict';
	define(['angular', 'angularMocks', 'app'], function(angular, mocks, app) {

		describe('todoModel', function() {

			var $httpBackend, $rootScope, $config, todoModel, customerHelper, successCb, mockData,
				errorCb, store, STORAGE_KEY, randomSuccessService;

			beforeEach(module('Todo.services'));

			angular.module('Todo.services').service('$config', function() {
				var baseUrl = 'http://127.0.0.1:9201/resources/';
				this.get = function(){
					return baseUrl;
				};
			});


			// specfile-specific beforEach
			beforeEach(inject(function($injector) {
				$httpBackend = $injector.get('$httpBackend');
				$rootScope = $injector.get('$rootScope');
				$config = $injector.get('$config');

				todoModel = $injector.get('todoModel');
				randomSuccessService = $injector.get('randomSuccessService');

				successCb = jasmine.createSpy();
				errorCb = jasmine.createSpy();

			}));

			beforeEach(function() {
				mockData = [];
				mockData.push({name: 'todo1', deadline: new Date(2014, 4, 1)});
				mockData.push({name: 'todo2', deadline: new Date(2015, 4, 5)});
				mockData.push({name: 'todo3', deadline: new Date(2014, 4, 2)});

				store = {};
				STORAGE_KEY = 'neo_todoList';
				store[STORAGE_KEY] = JSON.stringify(mockData);

				spyOn(localStorage, 'getItem').andCallFake(function (key) {
					return store[key];
				});
				spyOn(localStorage, 'setItem').andCallFake(function (key, value) {
					store[key] = value;
				});
				spyOn(localStorage, 'clear').andCallFake(function () {
					store = {};
				});
			});


			describe('todoModel', function() {


				afterEach(function() {
					todoModel.todoList.setModel([]);
					$httpBackend.verifyNoOutstandingExpectation();
					$httpBackend.verifyNoOutstandingRequest();
				});

				// Model in service with setter and getter
				it('should push data into Model', function() {
					var todoList = todoModel.todoList;
					expect(todoList.getModel().length).toBe(0);
					todoList.pushDataToModel(mockData[0]);
					expect(todoList.getModel().length).toBe(1);
				});

				it('should set data into Model', function() {
					var todoList = todoModel.todoList;
					expect(todoList.getModel().length).toEqual(0);
					todoList.setModel(mockData);
					expect(todoList.getModel().length).toEqual(mockData.length);
				});

				it('should remove single item from todo list', function() {
					var mockDataLength = mockData.length;
					var todoList = todoModel.todoList;
					todoList.setModel(mockData);
					todoList.removeModel(mockData[0]);
					expect(todoList.getModel().length).toEqual(mockDataLength - 1);
				});

				it('should get todo list when local storage is available', function() {
					var todoList = todoModel.todoList;
					var storedItems = [{}, {}];
					store[STORAGE_KEY] = JSON.stringify(storedItems);
					spyOn(randomSuccessService, 'getOutcome').andReturn(1);
					todoModel.getTodoList();
					expect(todoModel.todoList.getModel().length).toEqual(storedItems.length);
				});

				it('should get todo list when local storage is empty', function() {
					var todoList = todoModel.todoList;
					spyOn(randomSuccessService, 'getOutcome').andReturn(1);
					todoModel.getTodoList().then(successCb, errorCb);
					$rootScope.$digest();
					expect(successCb).toHaveBeenCalled();
					expect(todoModel.todoList.getModel().length).toEqual(mockData.length);
				});

				it('should throw error', function() {
					var todoList = todoModel.todoList;
					spyOn(randomSuccessService, 'getOutcome').andReturn(0);
					todoModel.getTodoList().then(successCb, errorCb);
					$rootScope.$digest();
					expect(errorCb).toHaveBeenCalled();
					expect(todoModel.todoList.getModel().length).toBe(0);
				});
				
				it('should save with resource call', function() {
					var todoList = todoModel.todoList;
					$httpBackend.expectPOST($config.get() + 'todo').respond(200, {});
					todoModel.saveTodoListResource(mockData).then(successCb, errorCb);
					$httpBackend.flush();
					expect(successCb).toHaveBeenCalled();
				});

				it('should save with resource call and fail', function() {
					var todoList = todoModel.todoList;
					$httpBackend.expectPOST($config.get() + 'todo').respond(409, {});
					todoModel.saveTodoListResource(mockData).then(successCb, errorCb);
					$httpBackend.flush();
					expect(errorCb).toHaveBeenCalled();
				});
			});
		});
	});
}());
