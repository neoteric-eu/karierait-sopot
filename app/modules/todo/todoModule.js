(function() {
	'use strict';
	define([
		'angular',
		'underscore',
		'./controllers/TodoController',
		'./models/todoModel',
		'./resources/todoResource',
		'./services/randomSuccessService',

		'./todoUrls',
	],
	function (angular, underscore, TodoController, todoModel, todoResource, randomSuccessService, todoUrls)
	{
		var moduleName = 'Todo';
		var controllers = moduleName + '.controllers';
		var services = moduleName + '.services';

		angular.module( moduleName, ['ngResource'])
			.constant('todoModulePath', './modules/todo/')
			.config(todoUrls);

		angular.module( services, ['ngResource'] )
			.service('todoModel', todoModel)
			.service('todoResource', todoResource)
			.service('randomSuccessService', randomSuccessService);

		angular.module( controllers, [])
			.controller('TodoController', TodoController);
			// .controller('ShareModalController', ShareModalController);
	});
}());
