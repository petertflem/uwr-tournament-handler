define(['angular'], function (ng) {
	var directives = ng.module('directives', []);

	/* top navigation tabs */
	directives.directive('tabset', function () {
		return {
			restrict: 'E',
			scope: {},
			transclude: true,
			replace: true,
			templateUrl: 'common/components/directives/templates/tabset.tpl.html'
		};
	})
	.directive('tab', ['$location', function ($location) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				route: '@',
				title: '@'
			},
			link: function (scope, element, attrs) {
				var route = attrs.route;

				scope.location = $location;
				scope.active = false;

				scope.$watch('location.path()', function (new_route) {
					scope.active = route === new_route;
				});
			},
			templateUrl: 'common/components/directives/templates/tab.tpl.html'
		};
	}]);

	return directives;
});