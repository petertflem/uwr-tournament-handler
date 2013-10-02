define(['angular'], function (ng) {
	var uwr = ng.module('uwr', []);

	uwr.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', 
				{
					controller: 'ctrl',
					templateUrl: 'app/modules/uwr/uwr.tpl.html'
				})
			.when('/home', 
				{
					controller: 'ctrl',
					templateUrl: 'app/modules/uwr/uwr.tpl.html'
				})
			.otherwise({ redirectTo: '/' });
	}]);

	uwr.controller('ctrl', ['$scope', function ($scope){
	
	}]);

	return uwr;
});