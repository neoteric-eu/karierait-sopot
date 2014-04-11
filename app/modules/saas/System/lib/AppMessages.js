(function() {
	'use strict';
	define([], function(){

		var $AppMessages = function($rootScope, $session) {
			var appMessages = {
				data: {},
				type: {
					success: 'success',
					warning: 'warning',
					error:   'error'
				},
					hideTime: 1500, //ms

					success: function(message){ appMessages.set(appMessages.type.success, message); appMessages.$apply(); },
					warning: function(message){ appMessages.set(appMessages.type.warning, message); appMessages.$apply(); },
					error: function(message){ appMessages.set(appMessages.type.error, message); appMessages.$apply(); },

					set: function(type, message){
						if(angular.isUndefined(appMessages.data[type])) {
							appMessages.data[type] = [];
						}

						appMessages.data[type].push({message: message });
					},

					get: function(type){
						var ret = false;
						if(!angular.isUndefined(appMessages.data[type]) && appMessages.data[type].length > 0){
							ret = appMessages.data[type].shift();
						}
						return ret;
					},

					getAll: function(type){
						var ret = false;
						if(!angular.isUndefined(appMessages.data[type]) && appMessages.data[type].length > 0){
							ret = appMessages.data[type];
							appMessages.data[type] = [];
						}

						return ret;
					},

					$apply: function(){
						if(!$session.get('disableMsg')){
							_.each(appMessages.type, function(key){
								var msgArray = appMessages.getAll(key);
								_.each(msgArray, function(msgObj){
									$.gritter.add({
										title: key,
										text: msgObj.message,
										sticky: false,
										image: './images/gfx/msg-'+key+'-icon.png',
										time: appMessages.hideTime,
										class_name: 'system-message-alert alert-'+key
									});
								});
							});
						}
					}

				};

				return appMessages;
		};
		return ['$rootScope', '$session', $AppMessages];
	});
}());
