(function() {
	'use strict';
	define([], function() {
		var loginRegisterHelper = function($System) {
			this.getToken = function(email, password) {
				var deferred = $System.$q.defer();

				var user = {};
				user.email = email;
				user.password = password;

				var data = {token: '12345'};
				deferred.resolve(data);

				return deferred.promise;
			};

			this.getFeatures = function() {
				var deferred = $System.$q.defer();
				var data = [];

				deferred.resolve(data);
				return deferred.promise;
			};

			// activates user
		};

		return ['$System', loginRegisterHelper];
	});
}());
