define(['angular'], function (ng) {
	var directives = ng.module('directives', []);

	/* top navigation tabs */
	directives.directive('tabset', function () {
		return {
			restrict: 'E',
			scope: {},
			transclude: true,
			replace: true,
			template: '<ul class="nav nav-tabs" ng-transclude></ul>'
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
			template: '<li data-ng-class="{active: active}">' +
						'<a href="#{{route}}">{{title}}</a>' +
						'</li>'
		};
	}]);

	return directives;
});