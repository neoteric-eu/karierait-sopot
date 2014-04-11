/* jshint unused: false */
(function() {
	'use strict';
	define([], function() {

		var randomSuccessService = function() {
			this.getOutcome = function() {
				return Math.floor((Math.random()*6)+1) % 2;
			};
		};

		return [randomSuccessService];
	});
}());
