/*jshint unused: vars */

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require.config({
	paths: {
		angular: '../../bower_components/angular/angular',
		angularRoute: '../../bower_components/angular-route/angular-route',
		angularCookies: '../../bower_components/angular-cookies/angular-cookies',
		angularSanitize: '../../bower_components/angular-sanitize/angular-sanitize',
		angularResource: '../../bower_components/angular-resource/angular-resource',
		angularMocks: '../../bower_components/angular-mocks/angular-mocks',
		text: '../../bower_components/requirejs-text/text',
		underscore: '../../bower_components/underscore/underscore',
		domReady: '../../bower_components/requirejs-domready/domReady',
		jQuery: '../../bower_components/jquery/dist/jquery',
		'gritter': '../bower_components/jquery.gritter/js/jquery.gritter.min',
		'ui.bootstrap': '../bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls',
		'theme.app': '../plugins/theme.app',
		'theme.smartwidgets': '../plugins/smartwidgets/jarvis.widget.min',
		'xeditable': '../../bower_components/angular-xeditable/dist/js/xeditable',
		ngTable: '../../bower_components/ng-table/ng-table',
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularCookies': ['angular'],
		'angularSanitize': ['angular'],
		'angularResource': ['angular'],
		'angularMocks': {
			deps:['angular'],
			exports:'angular.mock'
		},
		'underscore': {exports: '_'},
		'jQuery': {exports: '$'},
		'ui.bootstrap': { deps: ['angular'] },
		'theme.smartwidgets': { deps: ['jQuery']},
		'theme.app': { deps: ['jQuery']},
		'xeditable': { deps: ['angular']},
		'ngTable': { deps: ['angular']},
		'gritter': { deps: ['jQuery']}
	},
	priority: [
		'angular'
	],
	deps: [
		// kick start application... see bootstrap.js
		'./bootstrap'
	]
});
