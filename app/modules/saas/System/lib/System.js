(function() {
	'use strict';
	define([], function() {
		var $System = function($rootScope, $route, $routeParams, $template, permissions, $location, $session, $config, $appMessages, $enums, $compile, $q, $exceptionHandler) {
			var commonModel = {

				$route: $route,
				$routeParams: $routeParams,
				$template: $template,
				permissions: permissions,
				$location: $location,
				$session: $session,
				$config: $config,
				$appMessages: $appMessages,
				$enums: $enums,
				$compile: $compile,
				$q: $q,
				$exceptionHandler: $exceptionHandler,

				showLoader: function(){
					$rootScope.mainLoaderVisible = true; $rootScope.$safeApply();
				},

				hideLoader: function(){
					$rootScope.mainLoaderVisible = false; $rootScope.$safeApply();
				},

				getModuleValue: function(moduleName, valueKey){
					var module = angular.module(moduleName);
					var ret = false;
					_.each(module._invokeQueue, function(valueArray){
						if((valueArray[1] == 'value' || valueArray[1] == 'constant') && valueArray[2][0] == valueKey) ret = valueArray[2][1];
					});

					return ret;
				},

			};

			return commonModel;
		};
		return ['$rootScope', '$route', '$routeParams', '$template', 'permissions',
				'$location', '$session', '$config', '$AppMessages',
				'$enums', '$compile', '$q', '$exceptionHandler', $System];
	});
}());
