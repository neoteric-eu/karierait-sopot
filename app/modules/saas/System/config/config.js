(function() {
	'use strict';
	define([], function() {
		var $config = function(permissions){
			var config = {
				// domain: 'http://neob2b.local/',

				menu: [
					{ href: 'todo', title: 'Moja lista TODO', icon: 'fa fa-lg fa-fw fa-inbox', access: 'EF_INVOICE_GET' },
                                        // { href: 'invoice/import', title: 'Importuj fakturę', icon: 'fa fa-lg fa-fw fa-upload' },
				],

				cfg: {

					baseUrl: 'http://127.0.0.1:9201/resources/',


					// Client side error config url - url from Sentry settings
					loggedTime: 15,
				},

				get: function(element, cfg){
					var conf = this.cfg[element];
					if(!angular.isUndefined(cfg))
						conf = jQuery.extend(cfg, conf);
					return conf;
				},

				setDataTableEvent: function(config, event, fcn){
					var cfg = {};
					cfg[event] = fcn;
					confg = _.extend(config, cfg);
					return config;
				},


				getMenu: function() {
					var menu = angular.copy(this.menu);
					return _.filter(menu, function(item) {
						return permissions.checkMenuAccess(item.access);
					});
				},
			};
			return config;
		};
		return ['permissions', $config];
	});
}());
