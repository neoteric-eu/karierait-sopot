(function() {
	'use strict';
	define([], function() {
		var subscriptionResource = function($config, $resource) {
			return $resource($config.get('baseUrl')+'subscription/:action/',
				{
					action: '@action',
				},
				{

					getSubscription: {
						method: 'GET',
						isArray: false
					},

				}
			);
		};
		return ['$config', '$resource', subscriptionResource];
	});
}());
