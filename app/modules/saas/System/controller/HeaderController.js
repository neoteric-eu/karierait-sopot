(function() {
	'use strict';
	define([], function() {
		var HeaderController = function($rootScope, $scope, $route, permissions, $System) {

			$scope.refreshRoute = function() {
				$route.reload();
			};


			(function() {
				$scope.user = {
					email: $System.$session.getUser().email
				};
			})();
		};
		return ['$rootScope', '$scope', '$route', 'permissions', '$System', HeaderController];
	});

}());
