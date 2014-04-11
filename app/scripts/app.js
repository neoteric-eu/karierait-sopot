/* jshint unused: false, undef: false, quotmark:false */
define([
	'angular',
	'underscore',
	'angularResource',
	'../modules/todo/todoModule'
],
function (angular) {
	'use strict';
	return angular.module('app', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute',
		'ui.bootstrap',
		'xeditable',
		'ngTable',

		'System',
		'Todo',
		'Todo.controllers',
		'Todo.services',
	])

	.run(['$rootScope', '$session', 'loginRegisterHelper', 'permissions', '$location', '$AppMessages', '$config', 'setDefaultsHeaders', 'editableOptions',
	function($rootScope, $session, loginRegisterHelper, permissions, $location, $appMessages, $config, setDefaultsHeaders, editableOptions) {
		$rootScope.appReady = false;
		// set default headers
		var applicationId = $config.get('SaaSApplicationID');
		setDefaultsHeaders.setContentType('application/json');
		setDefaultsHeaders.setApplicationId(applicationId);

		editableOptions.theme = 'bs3';

		$session.init();

		$rootScope.appReady = true;
		$session.setLogged(true);

		if($session.isLoginDataPresent) {
			setDefaultsHeaders.setAuthToken($session.getToken());
			setDefaultsHeaders.setCustomerId($session.getCurrentCustomerId());

			loginRegisterHelper.getFeatures().then(function(data) {
				permissions.features = data.values;
				$rootScope.appReady = true;
				$session.setLogged(true);

			});
			// try request
		} else {
			$session.clearSession();
			$rootScope.appReady = true;
			// redirect to login screen;
		}

		$session.loggedTime = $config.get('loggedTime');

		$rootScope.redirectToLogin = function(){
			$location.url('login');
		};

		$rootScope.$on('event:loginRequired', function() {
			$session.clearSession();
			$rootScope.redirectToLogin();
		});

		$rootScope.$on('$locationChangeStart', function(event, nextRoute, currentRoute){
			var route = currentRoute.split('#');
			if(angular.isDefined(route[1])) {
				localStorage.setItem('prevRoute',route[1]);
			}
		});

		$rootScope.$on('$viewContentLoaded', function(event){
			pageSetUp();
		});

		$rootScope.$on('$routeChangeSuccess', function(event, currentRoute, priorRoute) {
			if(permissions.clearCache) {
				permissions.clearCache = false;
			}
			if($session.isLogged()) {
				try {
					if(!permissions.checkRouteAccess(currentRoute)) {
						$location.path('401');
						$session.set('prevRoute', null);
					}
				} catch (e) {
					$location.path('401');
					$session.set('prevRoute', null);
					throw e;
				}

				$session.updateCookieTime();
			} else {
				$location.path('/login');
			}

			$appMessages.$apply();
		});
	}
	]);

});
