define([], function () {
	var home = {};

	home.init = function () {
		this.home_template = 'app/modules/uwr/home/home.tpl.html';

		this.home_controller = 'home_controller';

		this.controller(this.home_controller, ['$scope', function ($scope) {

		}]);
	};

	return home;
});