(function() {
	'use strict';
	define([], function() {
		var setDefaultsHeaders = function($http) {

			this.setContentType = function(contentType) {
				$http.defaults.headers.common["Content-Type"] = contentType;
			};

			this.setAuthToken = function(token) {
				$http.defaults.headers.common["Authorization"] = 'token ' + token;
			};

			this.setCustomerId = function(customerId) {
				$http.defaults.headers.common["CustomerId"] = customerId;
			};

			this.setApplicationId = function(applicationId) {
				$http.defaults.headers.common["ApplicationId"] = applicationId;
			};

		};

		return ['$http', setDefaultsHeaders];
	});
}());
