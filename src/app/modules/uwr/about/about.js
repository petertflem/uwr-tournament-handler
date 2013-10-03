define([], function () {
	var about = {};

	about.init = function () {
		this.about_template = 'app/modules/uwr/about/about.tpl.html';

		this.about_controller = 'about_controller';

		this.controller(this.about_controller, ['$scope', function ($scope) {
			console.log('About controller!');
		}]);
	};

	return about;
});