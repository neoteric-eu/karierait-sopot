/* jshint unused: false */
(function() {
	'use strict';
	define([], function() {

		var STORAGE_KEY = 'neo_todoList';
		var randomSuccess = function() {
			return Math.floor((Math.random()*6)+1) % 2;
		};

		var model = {
			model: [],
			getModel: function() {
				return this.model;
			},
			pushDataToModel: function(data) {
				this.model.push(data);
			},
			setModel: function(data) {
				this.model = data;
			},
			removeModel: function(data) {
				var index = _.indexOf(this.model, data);
				if ( index > -1 ) {
					this.model.splice(index, 1);
				}
			}
		};

		var todoModel = function($q, randomSuccessService, todoResource) {
			var self = this;

			self.todoList = new Object(model);

			/**
			 *	@name model.todoList
			 *
			 *	@description
			 *	This is concept of keeping model in service with setter and getter
			 *
			 *	@var {Array<objects>} todoList Model an array of objects
			 */


			var todoObj = {
				name: 'unnamed',
				deadline: new Date(),
			};

			this.createNewItem = function() {
				self.todoList.pushDataToModel(new Object(todoObj));
			};
			/**
			 *	@describe Get all todoList, then set data to model
			 *	with function self.setModel(). 'self' it is root instance of this.
			 */
			this.getTodoList = function() {
				var data, mockData;
				var deferred = $q.defer();
				var storage = localStorage.getItem(STORAGE_KEY);
				mockData = [];
				mockData.push({name: 'todo1', deadline: new Date(2014, 4, 1)});
				mockData.push({name: 'todo2', deadline: new Date(2015, 4, 5)});
				mockData.push({name: 'todo3', deadline: new Date(2014, 4, 2)});

				// what if we didnt' have a service?
				// var wasSuccessful = randomSuccess();
				var wasSuccessful = randomSuccessService.getOutcome();
				if(wasSuccessful) {
					if(storage) {
						data = JSON.parse(storage);
					} else {
						data = mockData;
						localStorage[STORAGE_KEY] = JSON.stringify(data);
					}
					self.todoList.setModel(data);
					deferred.resolve(self.todoList.getModel());
				} else {
					deferred.reject(new Error('Błąd w pobieraniu listy todo'));
				}
				return deferred.promise;
			};


			/**
			 *	@param {object} todoList
			 *
			 *	@description Saves todoList. On success push
			 *	data into model.
			 */
			this.saveTodoList = function(todoList) {
				var deferred = $q.defer();
				var wasSuccessful = randomSuccess();
				if(angular.isArray(todoList) && wasSuccessful) {
					self.todoList.setModel(todoList);
					localStorage[STORAGE_KEY] = JSON.stringify(todoList);
					deferred.resolve(todoList);
				} else {
					deferred.reject('There was an error during saving todo list');
				}

				return deferred.promise;
			};

			this.saveTodoListResource = function(todoList) {
				var deferred = $q.defer();
				todoResource.saveTodoList(function(data) {
					self.todoList.setModel(data);
					if(!angular.isArray(todoList)) {
						deferred.reject('There was an error during saving todo list');
					} else {
						deferred.resolve(self.todoList.getModel());
					}
				}, function(reason) {
					deferred.reject(reason);
				});

				return deferred.promise;
			};

			this.removeTodoItem = function(todoItem) {
				var deferred = $q.defer();

				self.todoList.removeModel(todoItem);
				localStorage[STORAGE_KEY] = JSON.stringify(self.todoList.model);
				deferred.resolve();

				return deferred.promise;
			};
		};

		return ['$q', 'randomSuccessService', 'todoResource', todoModel];
	});
}());
