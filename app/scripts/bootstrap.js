define([
	'require',
	'angular',
	'jQuery',
	'underscore',
	'theme.smartwidgets',
	'theme.app',
	'gritter',
	'../modules/saas/System/systemModule',
	'../modules/todo/todoModule',
	'angularRoute',
	'angularCookies',
	'angularSanitize',
	'angularResource',
	'ui.bootstrap',
	'xeditable',
	'ngTable',
	'app'
	], function(require, angular) {
		'use strict';
		require(['domReady!'], function(document) {
			angular.bootstrap(document, ['app']);
		});
	}
);
