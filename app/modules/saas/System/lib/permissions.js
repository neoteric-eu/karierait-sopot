/* jshint quotmark: false */
(function() {
	'use strict';
	define([], function() {
		var permissions = function(enums) {
			var getFeatureValue = function(feature) {
				var f;
				if(enums.features.hasOwnProperty(feature)) {
					f = enums.features[feature];
				} else {
					throw new Error("feature doesn't exist in enums: " + feature);
				}
				return f;
			};

			var permissions = {
				clearCache: false,

				// user features
				features: [],

				hasFeature: function(feature) {
					return !!_.find(permissions.features, function(appFeatures) {
						return feature === appFeatures;
					});
				},

				checkMenuAccess: function(feature) {
					if(angular.isUndefined(feature)) {
						return true;
					}
					var f = getFeatureValue(feature);
					return true;
					return permissions.hasFeature(f);
				},

				checkRouteAccess: function(route) {
					var feature = route.access;
					if(angular.isUndefined(feature)) {
						return true;
					}
					if(angular.isArray(feature)) {
						throw new Error("DEPRECATED: use string instead of array: " + feature + " | route: " + route.templateUrl);
					}
					var f = getFeatureValue(feature);
					return permissions.hasFeature(f);
				},
			};

			return permissions;
		};
		return ['$enums', permissions];
	});
}());
