(function() {
	'use strict';
	define([] , function() {

		/**
		 * Urls management constructor ()
		 * - to be used in angular.module.config()
		 *
		 * @see systemModule.js
		 */

		var systemUrls = function($routeProvider) {
			var systemModulePath = './modules/saas/System/views';
			$routeProvider
			.when('/init', {templateUrl: systemModulePath + '/system/init.html'})
			// .when('/start', {templateUrl: systemModulePath + '/system/startMain.html' })
			.when('/logout', {templateUrl: systemModulePath + '/system/startMain.html' })
			.when('/login', {templateUrl: systemModulePath + '/system/login-form.html'})
			// .when('/register', {templateUrl: systemModulePath + '/system/register-form.html'})
			// .when('/remind-password', {templateUrl: systemModulePath + '/system/remind-password.html'})
			// .when('/activation', {templateUrl: systemModulePath + '/system/activation.html'})
			// .when('/activation/simplified', {templateUrl: systemModulePath + '/system/activation.html'})
			.when('/401', {templateUrl: systemModulePath + '/static/401.html'})
			.when('/account', {templateUrl: systemModulePath + '/system/user-data.html'})
                        .when('/email', {templateUrl: './modules/invoice/views/email.html'})

			.otherwise({redirectTo: '/start'});
		};
		return ['$routeProvider', systemUrls];
	});
}());
