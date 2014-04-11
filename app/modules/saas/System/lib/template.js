(function() {
	'use strict';
	define([], function() {
		var $template = function() {
			var template = {
				main: {
					mainNotLogged: './modules/saas/System/views/not-logged.html',
					main:	    './modules/saas/System/views/main.html',
					logged:     './modules/saas/System/views/main/logged.html',
					notLogged:  './modules/saas/System/views/main/not-logged.html'
				},

				company: {
					baseInfo: './views/main/company/baseInfo.html',
					account: './views/components/admin/main/account.html',
					users: './views/components/admin/main/users.html',
					subscription: './views/main/company/subscription.html',
					invoices: './views/main/company/invoices.html',
					payments: './views/main/company/payments.html'
				},

				get: function(section, element){

					var ret = this[section][element];
					if(!angular.isUndefined(ret)) {
						return ret;
					}
					return false;
				}
			};

			return template;

		};
		return [$template];
	});
}());
