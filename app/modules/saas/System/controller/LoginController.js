(function() {
	'use strict';
	define([], function() {
		var LoginController = function($scope, $location, loginRegisterHelper, setDefaultsHeaders, $System, $modal, systemModulePath, permissions, $template, $rootScope) {
			$scope.formError = false;
			$scope.user = {};

			$scope.init = function() {
				if ( $System.$session.isLogged() ) {
					getFeatures()
					.then(redirectToDashboard);
				}
			};

			$scope.loginAsAdmin = function() {
				$scope.user.email = 'mpaprocki@neoteric.eu';
				$scope.user.password = 'qweasd12345';
				$scope.login();
			};

			$scope.login = function() {
				$System.showLoader();

				getToken()
				.then(selectCustomerList)
				.then(getFeatures)
				.then(redirectToDashboard);
				// TODO: add exception handler (one to rule them all)

			};

			var getToken = function() {
				return loginRegisterHelper.getToken($scope.user.email, $scope.user.password).then(
					function(data){
					$scope.formError = false;
					setToken(data.token);
					$System.$session.setUserEmail($scope.user.email);
				}, function() {
					$scope.formError = true;
					$System.hideLoader();
				});
			};

			var getCustomerList = function() {
				return [];
			};


			var ChooseCustomerModalController = function($scope, $modalInstance, customers) {
				$scope.customers = customers;
				$scope.selected = customers[0];

				$scope.setCustomer = function(customer){
					$scope.selected = customer;
				};

				$scope.selectCustomer = function(){
					$modalInstance.close($scope.selected);
				};

				$scope.cancel = function() {
					$modalInstance.dismiss();
				};
			};


			/**
			 *	@param {Objects} customers - List of customers for current user
			 *	@description Displayed bootstrap modal
			 */
			var selectCustomerList = function(customers) {
				var deferred = $System.$q.defer();
				$System.hideLoader();
				var customer = {id: 1};
				setSelectedCustomer(customer);
				deferred.resolve();

				return deferred.promise;

			};

			/**
			 *	@param {string} selectedCustomerId
			 *	@description set customer id into the cookie, headers and session.
			 */
			var setSelectedCustomer = function(selectedCustomer) {
				setDefaultsHeaders.setCustomerId(selectedCustomer.id);
				$System.$session.setCurrentCustomerId(selectedCustomer.id);
				$System.$session.currentCustomer(selectedCustomer);
			};

			var setToken = function(token) {
				setDefaultsHeaders.setAuthToken(token);
				$System.$session.setToken(token);
			};

			var getFeatures = function() {
				$System.showLoader();
				return loginRegisterHelper.getFeatures().then(
					function(data) {
						permissions.features = data.values;
					}, function() {

					}
				);
			};

			/**
			 *	This is a bridge bettwen saasManager v1
			 *  and supermanager v2
			 */
			var redirectToDashboard = function() {
				$rootScope.menu = $System.$config.getMenu();
				$rootScope.template = $template.get('main', 'logged');
				$rootScope.mainTemplate = $template.get('main', 'main');
				$System.$session.setLogged(true);

				// Redirect to last known location path or #/start
				var prevRoute = localStorage.getItem('prevRoute') || '/start';
				if(prevRoute === '/login') {
					prevRoute = '/start';
				}
				$location.path(prevRoute);

				$System.hideLoader();
			};
		};
		return ['$scope', '$location', 'loginRegisterHelper', 'setDefaultsHeaders', '$System', '$modal', 'systemModulePath', 'permissions', '$template', '$rootScope', LoginController];
	});
}());
