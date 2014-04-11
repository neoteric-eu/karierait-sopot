(function() {
	'use strict';
	define([], function() {
		var $session = function($rootScope, $http, $cookieStore) {

			var sessionService = {
				// used by run.js to check route access
				logged: false,
				// init controller
				tryLogin: false,
				user: {},
				locale: 'pl',
				loggedTime: null,
				sessionUserKey: 'sessionUser',
				customer: null,
				currentCustomerId: null,
				token: null,
				data: {},
				isLoginDataPresent: false,
				inits: {},

				init: function() {
					self.user = {email: ''};
					var customerId = $cookieStore.get('CustomerId');
					var token = $cookieStore.get('token');
					if(token && customerId) {
						self.setCurrentCustomerId(customerId);
						self.setToken(token);
						var email = $cookieStore.get('email');
						if(email) {
							self.setUserEmail(email);
						};
						self.isLoginDataPresent = true;
						self.tryLogin = true;
					} else {
						self.setLogged(false);
					}
				},

				isLogged: function() {
					return self.logged;
				},

				setLogged: function(logged) {
					self.logged = logged;
				},

				// customer (profile) id
				getCurrentCustomerId: function(){
					return self.currentCustomerId;
				},

				setCurrentCustomerId: function(customerId){
					$cookieStore.put('CustomerId', customerId);
					self.currentCustomerId = customerId;
				},

				currentCustomer: function(value) {
					if(angular.isUndefined(value)) {
						return self.customer;
					} else {
						self.customer = value;
						if(value !== null) {
							self.setCurrentCustomerId(value.id);
							$http.defaults.headers.common["CustomerId"] = value.id;
						} else {
							self.setCurrentCustomerId(null);
						}
					}
				},

				// authorization token
				getToken: function() {
					return self.token;
				},

				setToken: function(token) {
					$cookieStore.put('token', token);
					self.token = token;
				},

				setUserEmail: function(email) {
					self.user.email = email;
					$cookieStore.put('email', email);
				},
				// old methods

				getUser: function(){
					return self.user;
				},

				clearCookie: function(){
					$cookieStore.remove('token');
					$cookieStore.remove('CustomerId');
					$cookieStore.remove(sessionService.sessionUserKey);
				},

				clearSession: function(){
					self.clearCookie();
					delete $http.defaults.headers.common["CustomerId"];
					delete $http.defaults.headers.common["Authorization"];

					self.setLogged(false);
					self.tryLogin = false;
					self.setUser(null);
					self.currentCustomer(null);
					self.isLoginDataPresent = false;
					localStorage.removeItem('prevRoute');
					self.init();
				},

				restoreCookieFromTemp: function(){
					var cookie = self.get('cookieTemp');
					$cookieStore.put(sessionService.sessionUserKey, cookie);
				},

				get: function(key){
					var res = null;
					_.each(self.data, function(_val, _key){ if(_key == key) res = _val;});
					if(res == null) res = JSON.parse(localStorage.getItem(key));

					if(res == null) res = false;
					return res;
				},

				set: function(key, value, intoLocalStorage){
					if(angular.isDefined(intoLocalStorage) && intoLocalStorage) {
						localStorage[key] = JSON.stringify(value);
					} else self.data[key] = value;
				},

				//methods
				setUser: function(user, userData, userProfile) {
					self.user = user;
					var obj = {
						user: user,
						userData: userData,
						activeTime: new Date()
					}

					if(angular.isDefined(userProfile)) {
						obj.customerId = userProfile.id;
						self.set(self.currentCustomerId,  userProfile.id);
					}

					if(angular.isDefined(user) && user != null && angular.isDefined(user.email) && angular.isDefined(userData))
						$cookieStore.put(sessionService.sessionUserKey, JSON.stringify(obj));
				},

				updateUserData: function(userData){
					var sessionCookie = $cookieStore.get(sessionService.sessionUserKey);
					var obj = JSON.parse(sessionCookie);
					if(obj != null && angular.isDefined(obj.userData)){
						obj.userData.firstName = userData.firstName;
						obj.userData.lastName = userData.lastName;

						if(angular.isDefined(userData.authorization)){
							obj.user.authorization = userData.authorization;
						}
					}
					self.setUser(obj.user, obj.userData, {id: obj.customerId});
				},

				setProfile: function(profile){
					var sessionCookie = $cookieStore.get(sessionService.sessionUserKey);
					var obj = JSON.parse(sessionCookie);
					self.setUser(obj.user, obj.userData, profile);
				},

				updateCookieTime: function(){
					var sessionCookie = $cookieStore.get(sessionService.sessionUserKey);
					if(sessionCookie != null){
						var obj = JSON.parse(sessionCookie);
						obj.activeTime = new Date();
						$cookieStore.put(sessionService.sessionUserKey, JSON.stringify(obj));
					}
				},

			};

			var self = sessionService;

			return sessionService;

		};
		return ['$rootScope', '$http', '$cookieStore', $session];
	});
}());
