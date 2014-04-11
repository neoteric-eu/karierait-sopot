(function() {
	'use strict';

	define([
		'angular',

		'./config/config',
		'./config/enums',

		'./controller/AppController',
		'./controller/HeaderController',
		'./controller/LoginController',

		'./helper/loginRegisterHelper',

		'./lib/AppMessages',
		'./lib/System',
		'./lib/permissions',
		'./lib/session',
		'./lib/setDefaultsHeaders',
		'./lib/template',

		'./systemUrls',
	],
	function (angular, config, enums, AppController, HeaderController, LoginController,
	          loginRegisterHelper, AppMessages, $System, permissions,
	          session, setDefaultsHeaders, template, systemUrls)
	{
		var moduleName = 'System';
		// var controllers = moduleName + '.controllers';
		// var services = moduleName + '.services';

		angular.module( moduleName, ['ngResource'] )
			.service('$config', config)
			.service('$enums', enums)
			.service('loginRegisterHelper', loginRegisterHelper)
			.service('$AppMessages', AppMessages)
			.service('$System', $System)
			.service('permissions', permissions)
			.service('$session', session)
			.service('setDefaultsHeaders', setDefaultsHeaders)
			.service('$template', template)

			.controller('AppController', AppController)
			.controller('HeaderController', HeaderController)
			.controller('LoginController', LoginController)
			.controller('HeaderController', HeaderController)

			.constant('systemModulePath', './modules/saas/System/')

			.config(systemUrls);

	});
}());
