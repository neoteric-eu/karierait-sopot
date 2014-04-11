(function() {
	'use strict';
	define([] , function() {

		/**
		 *	Urls management constructor ()
		 *	- to be used in angular.module.config()
		 *
		 *	@see todoModule.js
		 */

		var todoUrls = function($routeProvider) {
			var modulePath = './modules/todo/views/';
			$routeProvider
			.when('/start', {templateUrl: modulePath + 'todo-list.html'})
		};

		return ['$routeProvider', todoUrls];
	});
}());
