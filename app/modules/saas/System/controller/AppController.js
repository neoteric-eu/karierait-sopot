(function() {
	'use strict';
	define([], function() {
		var AppController = function($rootScope, $route, $location, $exceptionHandler, $session, $template, loginRegisterHelper, permissions, $config) {
			$('title').html('appName');
			$rootScope.lang = 'pl';

			$rootScope.$safeApply = function(){
				if($rootScope.$$phase != '$apply' && $rootScope.$$phase != '$digest') $rootScope.$apply();
			};

			$rootScope.logout = function(){
				$session.clearSession();
				$('title').html('appName');
				$rootScope.mainTemplate = $template.get('main', 'mainNotLogged');
				$rootScope.redirectToLogin();
			};

			function initApplication(redirectPath) {
				return loginRegisterHelper.getFeatures().then(function(data) {
					permissions.features = data.values;
					$rootScope.menu = $config.getMenu();
					$rootScope.mainTemplate = $template.get('main', 'main');
					$rootScope.template = $template.get('main', 'logged');
					$rootScope.startTemplate = './modules/saas/System/views/system/startMain.html';

					// Redirect to last known location path or #/start
					if(angular.isDefined(redirectPath)) {
						$location.path(redirectPath);
					} else {
						var prevRoute = localStorage.getItem('prevRoute') || '/start';
						$location.path(prevRoute);
					}
					// needed for reloading whole page
					$route.reload();

				}, function(reason) {
					$exceptionHandler(reason);
					$rootScope.mainTemplate = $template.get('main', 'main');
					$rootScope.template = $template.get('main', 'logged');
				});
			}

			// init;
			(function() {
				var path = $location.path();
				if($session.isLogged()) {
					initApplication(path);
				} else {
					$rootScope.mainTemplate = $template.get('main', 'mainNotLogged');
					$rootScope.redirectToLogin();
				}
			})();

		};
		return ['$rootScope', '$route', '$location', '$exceptionHandler', '$session', '$template', 'loginRegisterHelper', 'permissions', '$config', AppController];
	});
}());
